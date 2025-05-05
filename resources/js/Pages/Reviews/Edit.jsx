import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Select from '@/Components/Select';
import Textarea from '@/Components/Textarea';

export default function Edit({ review, users, books }) {
    const { data, setData, put, processing, errors } = useForm({
        user_id: review.user_id,
        book_id: review.book_id,
        rating: review.rating,
        comment: review.comment,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('reviews.update', review.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Review" />
            <Container>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Review</h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <Label htmlFor="user_id">User</Label>
                        <Select
                            id="user_id"
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                            error={errors.user_id}
                        >
                            <option value="">Select a user</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="book_id">Book</Label>
                        <Select
                            id="book_id"
                            value={data.book_id}
                            onChange={(e) => setData('book_id', e.target.value)}
                            error={errors.book_id}
                        >
                            <option value="">Select a book</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="rating">Rating</Label>
                        <Input
                            id="rating"
                            type="number"
                            value={data.rating}
                            onChange={(e) => setData('rating', e.target.value)}
                            error={errors.rating}
                        />
                    </div>

                    <div>
                        <Label htmlFor="comment">Comment</Label>
                        <Textarea
                            id="comment"
                            value={data.comment}
                            onChange={(e) => setData('comment', e.target.value)}
                            error={errors.comment}
                        />
                    </div>

                    <div className="mt-4">
                        <Button type="submit" processing={processing}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Container>
        </AuthenticatedLayout>
    );
}
