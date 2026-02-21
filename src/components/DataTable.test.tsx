import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTable } from './DataTable'
import type { ColumnDef } from '@tanstack/react-table'

type Row = { id: string; name: string; score: number }

const columns: ColumnDef<Row, unknown>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'score', header: 'Score' },
]

describe('DataTable', () => {
  it('renders headers', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        getRowId={(row) => row.id}
        defaultPageSize={10}
      />
    )
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Score' })).toBeInTheDocument()
  })

  it('shows "No data" when data is empty', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        getRowId={(row) => row.id}
        defaultPageSize={10}
      />
    )
    expect(screen.getByText('No data')).toBeInTheDocument()
  })

  it('renders rows', () => {
    const data: Row[] = [
      { id: '1', name: 'Alice', score: 10 },
      { id: '2', name: 'Bob', score: 20 },
    ]
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        defaultPageSize={10}
      />
    )
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
  })

  it('shows pagination when data length > 0', () => {
    const data: Row[] = [{ id: '1', name: 'A', score: 1 }]
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        defaultPageSize={10}
      />
    )
    expect(screen.getByText(/Showing 1–1 of 1/)).toBeInTheDocument()
  })

  it('has page size selector with options', () => {
    const data: Row[] = [{ id: '1', name: 'A', score: 1 }]
    render(
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 20]}
      />
    )
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '5 per page' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '10 per page' })).toBeInTheDocument()
  })
})
