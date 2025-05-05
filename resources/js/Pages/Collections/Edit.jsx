import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Button from '@/Components/Button';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, collection, users, books }) {
    // Inisialisasi form dengan data yang sudah ada
    const { data, setData, put, processing, errors } = useForm({
        user_id: collection.user_id, // User yang ada pada koleksi
        book_id: collection.book_id, // Book yang ada pada koleksi
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('collections.update', collection.id), {
            onSuccess: () => {
                // Setelah berhasil, kita bisa redirect ke halaman collections.index atau melakukan sesuatu
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Collection
                </h2>
            }
        >
            <Head title="Edit Collection" />
            <Container>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dropdown untuk memilih User */}
                    <div>
                        <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                            User
                        </label>
                        <select
                            id="user_id"
                            name="user_id"
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.user_id && <div className="text-red-500 text-sm">{errors.user_id}</div>}
                    </div>

                    {/* Dropdown untuk memilih Book */}
                    <div>
                        <label htmlFor="book_id" className="block text-sm font-medium text-gray-700">
                            Book
                        </label>
                        <select
                            id="book_id"
                            name="book_id"
                            value={data.book_id}
                            onChange={(e) => setData('book_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Select Book</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title}
                                </option>
                            ))}
                        </select>
                        {errors.book_id && <div className="text-red-500 text-sm">{errors.book_id}</div>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Collection'}
                        </Button>
                    </div>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
