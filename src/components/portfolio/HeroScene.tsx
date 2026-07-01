import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, TorusKnot } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function Knot() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * 0.15;
      ref.current.rotation.y += dt * 0.2;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <TorusKnot ref={ref} args={[1.1, 0.32, 180, 32]} position={[1.6, 0.2, 0]}>
        <MeshDistortMaterial
          color="#8B5CF6"
          emissive="#6366F1"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.6}
          distort={0.35}
          speed={1.6}
        />
      </TorusKnot>
    </Float>
  );
}

function Ico() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron args={[0.7, 0]} position={[-2, 1.2, 0]}>
        <MeshDistortMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </Icosahedron>
    </Float>
  );
}

function Sphere2() {
  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh position={[-1.4, -1.4, -0.5]}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <MeshDistortMaterial
          color="#6366F1"
          emissive="#8B5CF6"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
          distort={0.5}
          speed={1.4}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} color="#a5b4fc" />
      <pointLight position={[-5, -3, -2]} intensity={1} color="#06B6D4" />
      <Suspense fallback={null}>
        <Knot />
        <Ico />
        <Sphere2 />
      </Suspense>
    </Canvas>
  );
}
