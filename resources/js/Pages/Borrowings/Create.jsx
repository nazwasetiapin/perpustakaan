import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Button from '@/Components/Button';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth, users, books }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        book_id: '',
        borrowed_at: '',
        returned_at: '', // Ditambahkan field returned_at
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('borrowings.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Peminjaman</h2>}>
            <Head title="Tambah Peminjaman" />

            <Container>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                    <div>
                        <InputLabel htmlFor="user_id" value="Peminjam" />
                        <select
                            id="user_id"
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Pilih pengguna</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.user_id} />
                    </div>

                    <div>
                        <InputLabel htmlFor="book_id" value="Buku" />
                        <select
                            id="book_id"
                            value={data.book_id}
                            onChange={(e) => setData('book_id', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Pilih buku</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>{book.title}</option>
                            ))}
                        </select>
                        <InputError message={errors.book_id} />
                    </div>

                    <div>
                        <InputLabel htmlFor="borrowed_at" value="Tanggal Pinjam" />
                        <input
                            type="date"
                            id="borrowed_at"
                            value={data.borrowed_at}
                            onChange={(e) => setData('borrowed_at', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        <InputError message={errors.borrowed_at} />
                    </div>

                    <div>
                        <InputLabel htmlFor="returned_at" value="Tanggal Pengembalian (opsional)" />
                        <input
                            type="date"
                            id="returned_at"
                            value={data.returned_at}
                            onChange={(e) => setData('returned_at', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        <InputError message={errors.returned_at} />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Simpan
                    </Button>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
