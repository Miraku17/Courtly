"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export const TennisBallScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(3, 4, 5);
    scene.add(directionalLight);

    const rimLight = new THREE.DirectionalLight(0xd9f170, 0.4);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    // Tennis ball
    const ballGeometry = new THREE.SphereGeometry(1.1, 64, 64);

    // Fuzzy tennis ball material
    const ballMaterial = new THREE.MeshStandardMaterial({
      color: 0xd9f170,
      roughness: 0.85,
      metalness: 0.05,
    });

    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    scene.add(ball);

    // Seam curve (the characteristic tennis ball line)
    const createSeamCurve = (offset: number) => {
      const points: THREE.Vector3[] = [];
      const radius = 1.12;
      for (let i = 0; i <= 200; i++) {
        const t = (i / 200) * Math.PI * 2;
        const x = radius * Math.cos(t);
        const y = radius * Math.sin(t) * Math.cos(t * 0.5 + offset);
        const z = radius * Math.sin(t) * Math.sin(t * 0.5 + offset);
        points.push(new THREE.Vector3(x, y, z));
      }
      return points;
    };

    const seamMaterial = new THREE.LineBasicMaterial({
      color: 0x1a3a1a,
      linewidth: 2,
    });

    const seam1Points = createSeamCurve(0);
    const seam1Geometry = new THREE.BufferGeometry().setFromPoints(seam1Points);
    const seam1 = new THREE.Line(seam1Geometry, seamMaterial);
    scene.add(seam1);

    const seam2Points = createSeamCurve(Math.PI);
    const seam2Geometry = new THREE.BufferGeometry().setFromPoints(seam2Points);
    const seam2 = new THREE.Line(seam2Geometry, seamMaterial);
    scene.add(seam2);

    // Floating particles around the ball
    const particleCount = 40;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.6 + Math.random() * 1.2;
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      particleSpeeds[i] = 0.3 + Math.random() * 0.7;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd9f170,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // Animation
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow rotation + mouse influence
      ball.rotation.x = elapsed * 0.3 + mouseY * 0.3;
      ball.rotation.y = elapsed * 0.5 + mouseX * 0.3;

      seam1.rotation.x = ball.rotation.x;
      seam1.rotation.y = ball.rotation.y;
      seam2.rotation.x = ball.rotation.x;
      seam2.rotation.y = ball.rotation.y;

      // Gentle float
      ball.position.y = Math.sin(elapsed * 0.8) * 0.15;
      seam1.position.y = ball.position.y;
      seam2.position.y = ball.position.y;

      // Rotate particles
      particles.rotation.y = elapsed * 0.15;
      particles.rotation.x = elapsed * 0.1;

      // Pulse particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const baseR = 1.6 + (particleSpeeds[i] * 1.2);
        const pulse = Math.sin(elapsed * particleSpeeds[i] + i) * 0.1;
        const scale = 1 + pulse;
        const idx = i * 3;
        const len = Math.sqrt(positions[idx] ** 2 + positions[idx + 1] ** 2 + positions[idx + 2] ** 2);
        if (len > 0) {
          const targetR = baseR * scale;
          const factor = targetR / len;
          positions[idx] *= factor;
          positions[idx + 1] *= factor;
          positions[idx + 2] *= factor;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width: w, height: h } = entry.contentRect;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      ballGeometry.dispose();
      ballMaterial.dispose();
      seamMaterial.dispose();
      seam1Geometry.dispose();
      seam2Geometry.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="size-full" />;
};
