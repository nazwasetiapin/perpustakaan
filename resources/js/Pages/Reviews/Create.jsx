import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Button from '@/Components/Button';
import Input from '@/Components/Input';

export default function Create({ auth, users, books }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        book_id: '',
        rating: '',
        comment: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reviews.store'), {
            onSuccess: () =>
                setData({
                    user_id: '',
                    book_id: '',
                    rating: '',
                    comment: '',
                }),
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Review" />

            <Container>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-6">
                    Create Review
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Dropdown User */}
                    <div>
                        <select
                            id="user_id"
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.user_id && (
                            <div className="text-sm text-red-500 mt-1">{errors.user_id}</div>
                        )}
                    </div>

                    {/* Dropdown Book */}
                    <div>
                        <select
                            id="book_id"
                            value={data.book_id}
                            onChange={(e) => setData('book_id', e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Select Book</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title}
                                </option>
                            ))}
                        </select>
                        {errors.book_id && (
                            <div className="text-sm text-red-500 mt-1">{errors.book_id}</div>
                        )}
                    </div>

                    {/* Rating */}
                    <div>
                        <Input
                            type="number"
                            min="1"
                            max="5"
                            value={data.rating}
                            onChange={(e) => setData('rating', e.target.value)}
                            placeholder="Rating (1-5)"
                            className="w-full"
                        />
                        {errors.rating && (
                            <div className="text-sm text-red-500 mt-1">{errors.rating}</div>
                        )}
                    </div>

                    {/* Comment */}
                    <div>
                        <textarea
                            value={data.comment}
                            onChange={(e) => setData('comment', e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                            rows={4}
                            placeholder="Comment"
                        />
                        {errors.comment && (
                            <div className="text-sm text-red-500 mt-1">{errors.comment}</div>
                        )}
                    </div>

                    {/* Button */}
                    <div>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Submitting...' : 'Save Review'}
                        </Button>
                    </div>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
