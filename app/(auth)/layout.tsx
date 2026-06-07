import React from 'react'

function AuthLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="min-h-screen bg-linear-to-br from-base-900 to-base-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
