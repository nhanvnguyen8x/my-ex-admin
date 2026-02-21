import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'
import { store, createTestStore } from '@/store'
import type { RootState } from '@/store'

interface AllProvidersOptions {
  initialEntries?: MemoryRouterProps['initialEntries']
  initialIndex?: number
  preloadedState?: Partial<RootState>
}

function AllProviders({
  children,
  initialEntries = ['/'],
  initialIndex,
  store: storeOverride,
}: {
  children: React.ReactNode
  initialEntries?: MemoryRouterProps['initialEntries']
  initialIndex?: number
  store?: ReturnType<typeof createTestStore>
}) {
  const storeToUse = storeOverride ?? store
  return (
    <Provider store={storeToUse}>
      <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
        {children}
      </MemoryRouter>
    </Provider>
  )
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'> & AllProvidersOptions) {
  const { initialEntries, initialIndex, preloadedState, ...renderOptions } = options ?? {}
  const storeToUse = preloadedState ? createTestStore(preloadedState) : undefined
  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders store={storeToUse} initialEntries={initialEntries} initialIndex={initialIndex}>
        {children}
      </AllProviders>
    ),
    ...renderOptions,
  })
}

export * from '@testing-library/react'
export { customRender as render }
