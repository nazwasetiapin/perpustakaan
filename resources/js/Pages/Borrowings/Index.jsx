import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import { Head, usePage } from '@inertiajs/react';
import Search from '@/Components/Search';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {
    const { borrowings, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Borrowings
                </h2>
            }
        >
            <Head title="Borrowings" />

            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(['borrowings create']) && (
                        <Button type="add" url={route('borrowings.create')} />
                    )}
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route('borrowings.index')}
                            placeholder="Search book title..."
                            filter={filters}
                        />
                    </div>
                </div>

                <Table.Card title="Borrowings">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>No</Table.Th>
                                <Table.Th>User</Table.Th>
                                <Table.Th>Book Title</Table.Th>
                                <Table.Th>Borrowed At</Table.Th>
                                <Table.Th>Returned At</Table.Th> {/* Added column */}
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {borrowings.data.map((borrowing, i) => (
                                <tr key={borrowing.id}>
                                    <Table.Td>
                                        {i + 1 + (borrowings.current_page - 1) * borrowings.per_page}
                                    </Table.Td>
                                    <Table.Td>{borrowing.user?.name}</Table.Td>
                                    <Table.Td>{borrowing.book?.title}</Table.Td>
                                    <Table.Td>{borrowing.borrowed_at}</Table.Td>
                                    <Table.Td>{borrowing.returned_at || '-'}</Table.Td> {/* Display "-" if no return date */}
                                    <Table.Td>
                                        {borrowing.status === 'borrowed' ? 'Borrowed' : 'Returned'}
                                    </Table.Td> {/* Simplify Status */}
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            {hasAnyPermission(['borrowings edit']) && (
                                                <Button type="edit" url={route('borrowings.edit', borrowing.id)} />
                                            )}
                                            {hasAnyPermission(['borrowings delete']) && (
                                                <Button type="delete" url={route('borrowings.destroy', borrowing.id)} />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                <div className="flex items-center justify-center mt-4">
                    {borrowings.total > borrowings.per_page && (
                        <Pagination links={borrowings.links} />
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
