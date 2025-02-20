import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import { Head, usePage } from '@inertiajs/react';
import Search from '@/Components/Search';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {
    // Destructuring posts dan filters dari props Inertia
    const { posts, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Posts
                </h2>
            }
        >
            <Head title={'Posts'} />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(['posts create']) && (
                        <Button type={'add'} url={route('posts.create')} />
                    )}
                    <div className="w-full md:w-4/6">
                        <Search 
                            url={route('posts.index')} 
                            placeholder={'Search posts by title...'} 
                            filter={filters} 
                        />
                    </div>
                </div>
                <Table.Card title={'Posts'}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Title</Table.Th>
                                <Table.Th>Body</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {posts.data.map((post, i) => (
                                <tr key={post.id}>
                                    <Table.Td>
                                        {i + 1 + (posts.current_page - 1) * posts.per_page}
                                    </Table.Td>
                                    <Table.Td>{post.title}</Table.Td>
                                    <Table.Td>{post.body}</Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            {hasAnyPermission(['posts edit']) && (
                                                <Button type={'edit'} url={route('posts.edit', post.id)} />
                                            )}
                                            {hasAnyPermission(['posts delete']) && (
                                                <Button type={'delete'} url={route('posts.destroy', post.id)} />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className="flex items-center justify-center">
                    {posts.last_page !== 1 && (
                        <Pagination links={posts.links} />
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
