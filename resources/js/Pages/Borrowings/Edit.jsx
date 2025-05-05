import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Button from '@/Components/Button';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth, borrowing, users, books }) {
    // Pastikan borrowing tidak undefined, dan beri default nilai kosong jika ada nilai kosong
    const { data, setData, put, processing, errors } = useForm({
        returned_at: borrowing?.returned_at || '',
        status: borrowing?.status || 'borrowed',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('borrowings.update', borrowing?.id)); // pastikan borrowing.id ada
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Peminjaman
                </h2>
            }
        >
            <Head title="Edit Peminjaman" />

            <Container>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                    {/* Peminjam */}
                    <div>
                        <InputLabel htmlFor="user_id" value="Peminjam" />
                        <input
                            type="text"
                            disabled
                            value={borrowing?.user?.name || 'Tidak ada peminjam'} // fallback jika user tidak ada
                            className="w-full bg-gray-100 border rounded px-3 py-2"
                        />
                    </div>

                    {/* Buku */}
                    <div>
                        <InputLabel htmlFor="book_id" value="Judul Buku" />
                        <input
                            type="text"
                            disabled
                            value={borrowing?.book?.title || 'Tidak ada buku'} // fallback jika book tidak ada
                            className="w-full bg-gray-100 border rounded px-3 py-2"
                        />
                    </div>

                    {/* Tanggal Pinjam */}
                    <div>
                        <InputLabel htmlFor="borrowed_at" value="Tanggal Pinjam" />
                        <input
                            type="text"
                            disabled
                            value={borrowing?.borrowed_at || 'Tidak ada tanggal pinjam'} // fallback jika borrowed_at tidak ada
                            className="w-full bg-gray-100 border rounded px-3 py-2"
                        />
                    </div>

                    {/* Tanggal Pengembalian */}
                    <div>
                        <InputLabel htmlFor="returned_at" value="Tanggal Pengembalian" />
                        <input
                            type="date"
                            id="returned_at"
                            value={data.returned_at}
                            onChange={(e) => setData('returned_at', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        <InputError message={errors.returned_at} />
                    </div>

                    {/* Status */}
                    <div>
                        <InputLabel htmlFor="status" value="Status" />
                        <select
                            id="status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="borrowed">Dipinjam</option>
                            <option value="returned">Dikembalikan</option>
                        </select>
                        <InputError message={errors.status} />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Update
                    </Button>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
