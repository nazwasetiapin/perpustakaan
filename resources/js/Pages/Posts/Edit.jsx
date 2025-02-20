import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Edit({ auth }) {
    // Destructuring post dari props Inertia
    const { post } = usePage().props;

    // Inisialisasi state form dengan field title dan body, serta _method 'put'
    const { data, setData, post: submit, errors } = useForm({
        title: post.title,
        body: post.body,
        _method: 'put'
    });

    // Method untuk meng-update data post
    const handleUpdateData = async (e) => {
        e.preventDefault();

        submit(route('posts.update', post.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Post updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Post
                </h2>
            }
        >
            <Head title={'Edit Post'} />
            <Container>
                <Card title={'Edit Post'}>
                    <form onSubmit={handleUpdateData}>
                        <div className="mb-4">
                            <Input
                                label={'Title'}
                                type={'text'}
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                errors={errors.title}
                                placeholder="Input post title..."
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                label={'Body'}
                                type={'text'}
                                value={data.body}
                                onChange={e => setData('body', e.target.value)}
                                errors={errors.body}
                                placeholder="Input post body..."
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('posts.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
