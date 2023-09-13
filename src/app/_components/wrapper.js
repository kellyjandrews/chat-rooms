export default function PageWrapper({ children }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex-row h-full w-full items-center justify-between font-mono text-sm">
        {children}
      </div>
    </main>
  )
}
