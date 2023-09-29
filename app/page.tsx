// @ts-nocheck
"use client";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Sky,
  Environment,
  Cloud,
} from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";

export default function Home() {
  return (
    <>
      <Background />
      <Overlay />
    </>
  );
}

function Overlay() {
  return (
    <>
      <div
        className="game-name"
        style={{ top: 40, left: 40, color: "rgb(36, 54, 110)" }}
      >
        FaFa
      </div>
      <div
        className="game-name"
        style={{ bottom: 40, right: 40, color: "rgb(36, 54, 110)" }}
      >
        Runner
      </div>
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          fontSize: "20px",
          display: "inline-block",
        }}
      >
        <a
          style={{ fontWeight: 800, letterSpacing: 4 }}
          href="https://www.chenyifaer.com/join"
          target="_blank"
        >
          JOIN INSIDER
        </a>
        <div
          style={{
            marginTop: 6,
            height: 2.5,
            width: "100%",
            background: "#3e3e3d",
          }}
        />
      </div>
      {/*<div style={{ position: 'absolute', left: 40, bottom: 40, fontSize: '20px' }}>*/}
      {/*  <div style={{ position: 'relative', marginTop: 10, display: 'inline-block' }}>*/}
      {/*    <a style={{ fontSize: '20px', fontWeight: 800, letterSpacing: 4 }} href="https://chenyifaer.com/fafa-runner/play" target="_blank">*/}
      {/*      PLAY*/}
      {/*    </a>*/}
      {/*    <div style={{ marginTop: 6, height: 2.5, width: '100%', background: '#3e3e3d' }} />*/}
      {/*  </div>*/}
      {/*  <br />*/}
      {/*</div>*/}
    </>
  );
}

function Background() {
  // const { debug } = useControls({ debug: false })
  return (
    <Canvas shadows camera={{ position: [-50, -25, 150], fov: 15 }}>
      <Suspense fallback={null}>
        <hemisphereLight intensity={0.45} />
        <spotLight
          angle={0.4}
          penumbra={1}
          position={[20, 30, 2.5]}
          castShadow={true}
          shadow-bias={-0.00001}
        />
        <directionalLight
          color="red"
          position={[-10, -10, 0]}
          intensity={1.5}
        />
        <Cloud scale={1.5} position={[20, 0, 0]} />
        <Cloud scale={1} position={[-20, 10, 0]} />
        <Environment preset="city" />
        <Sky />
        <Physics colliders={false}>
          <group position={[2, 3, 0]}>
            <Track position={[-3, 0, 10.5]} rotation={[0, -0.4, 0]} />
            <Sphere position={[-12, 13, 0]} />
            <Sphere position={[-9, 13, 0]} />
            <Sphere position={[-6, 13, 0]} />
            <Pacman />
          </group>
        </Physics>
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}

function Track(props) {
  const { nodes } = useGLTF("/fafa-runner/ball-trip.optimized.glb");
  return (
    <RigidBody colliders="trimesh" type="fixed">
      <mesh geometry={nodes.Cylinder.geometry} {...props} dispose={null}>
        <meshPhysicalMaterial
          color="lightblue"
          transmission={1}
          thickness={1}
          roughness={0}
        />
      </mesh>
      <Cylinder position={[-0.85, 4, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Cylinder position={[1.5, 1.75, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Cylinder position={[1.15, 1, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Cylinder position={[2, 3, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Cylinder position={[1.25, 5, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Cylinder position={[-1, 7, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Cylinder position={[-1.5, 5, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Cylinder position={[1.75, 8, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Box position={[-3, 11, 0]} rotation={[0, 0, -0.5]} />
      <Box position={[-8.6, 12.3, 0]} length={8} rotation={[0, 0, -0.1]} />
    </RigidBody>
  );
}

function Pacman() {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.setNextKinematicTranslation({
      x: -5,
      y: -8 + Math.sin(t * 10) / 2,
      z: 0,
    });
  });
  return (
    <group>
      <RigidBody ref={ref} type="kinematicPosition" colliders="trimesh">
        <mesh
          castShadow={true}
          receiveShadow={true}
          rotation={[-Math.PI / 2, Math.PI, 0]}
        >
          <sphereGeometry args={[10, 16, 16, 0, Math.PI * 1.3]} />
          <meshStandardMaterial color="#ffc060" side={THREE.DoubleSide} />
        </mesh>
        <mesh castShadow={true} position={[-5, 0, 8.5]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="black" roughness={0.75} />
        </mesh>
      </RigidBody>
    </group>
  );
}

const Box = ({ length = 4, ...props }) => (
  <mesh castShadow={true} receiveShadow={true} {...props}>
    <boxGeometry args={[length, 0.4, 4]} />
    <meshStandardMaterial color="white" />
  </mesh>
);

const Sphere = (props) => (
  <RigidBody colliders="ball" restitution={0.7}>
    <mesh castShadow={true} receiveShadow={true} {...props}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="white" />
    </mesh>
  </RigidBody>
);

const Cylinder = (props) => (
  <mesh castShadow={true} receiveShadow={true} {...props}>
    <cylinderGeometry args={[0.25, 0.25, 4]} />
    <meshStandardMaterial />
  </mesh>
);
