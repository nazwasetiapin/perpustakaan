import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {
    const { reviews, filters } = usePage().props;

    // Pastikan reviews ada dan memiliki data sebelum diakses
    if (!reviews || !reviews.data) {
        return (
            <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reviews</h2>}>
                <Head title="Reviews" />
                <Container>
                    <p>No reviews available.</p>
                </Container>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reviews</h2>}>
            <Head title="Reviews" />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(['reviews create']) && <Button type="add" url={route('reviews.create')} />}
                    <div className="w-full md:w-4/6">
                        <Search url={route('reviews.index')} placeholder="Search reviews..." filter={filters} />
                    </div>
                </div>

                <Table.Card title="Reviews">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>No</Table.Th>
                                <Table.Th>User</Table.Th>
                                <Table.Th>Book</Table.Th>
                                <Table.Th>Rating</Table.Th>
                                <Table.Th>Comment</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {reviews.data.map((review, i) => (
                                <tr key={review.id}>
                                    <Table.Td>{i + 1 + (reviews.current_page - 1) * reviews.per_page}</Table.Td>
                                    <Table.Td>{review.user.name}</Table.Td>
                                    <Table.Td>{review.book.title}</Table.Td>
                                    <Table.Td>{review.rating}</Table.Td>
                                    <Table.Td>{review.comment}</Table.Td>
                                    {/* Tombol Edit dan Delete */}
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            {hasAnyPermission(['reviews edit']) && <Button type="edit" url={route('reviews.edit', review.id)} />}
                                            {hasAnyPermission(['reviews delete']) && <Button type="delete" url={route('reviews.destroy', review.id)} />}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                <div className="flex items-center justify-center">
                    {reviews.last_page > 1 && <Pagination links={reviews.links} />}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
