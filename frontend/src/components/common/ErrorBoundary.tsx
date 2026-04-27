import React from 'react';

export class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback?: string }, { hasError: boolean; error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[BK Career Academy Error]', error, info.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-void flex items-center justify-center px-8">
          <div className="max-w-lg text-center">
            <div className="text-[#F7931A] text-5xl mb-6">⚠</div>
            <h2 className="text-2xl font-heading font-bold text-white mb-4 uppercase">Something Went Wrong</h2>
            <p className="text-[#94A3B8] mb-8">{this.props.fallback || 'An error occurred while loading this page.'}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-3 bg-[#F7931A] text-black font-bold rounded-xl hover:bg-white transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
