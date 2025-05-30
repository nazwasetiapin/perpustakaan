import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';
export default function Create({auth}) {

    // define state with helper inertia
    const { data, setData, post, errors } = useForm({
        name : ''
    });

    // define method handleStoreData
    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route('categories.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data created successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Categories</h2>}
        >
            <Head title={'Create Categories'}/>
            <Container>
                <Card title={'Create new categories'}>
                    <form onSubmit={handleStoreData}>
                        <div className='mb-4'>
                            <Input label={'Category Name'} 
                            type={'text'} value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} placeholder="Input category name.."/>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('categories.index')}/>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
}