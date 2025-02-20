import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth }) {
    // Mendefinisikan state form dengan field title dan body
    const { data, setData, post, errors } = useForm({
        title: '',
        body: ''
    });

    // Method untuk menyimpan data post
    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route('posts.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Post created successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Post
                </h2>
            }
        >
            <Head title={'Create Post'} />
            <Container>
                <Card title={'Create new post'}>
                    <form onSubmit={handleStoreData}>
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
