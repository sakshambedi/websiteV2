"use client";
import dynamic from 'next/dynamic'

const CursorFollower = dynamic(
  () => import('@/components/animations/CursorFollower').then(mod => ({ default: mod.CursorFollower })),
  { ssr: false }
)

export default function ClientCursor() {
  return <CursorFollower />
}
