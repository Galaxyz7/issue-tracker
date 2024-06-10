'use client';


import { TextField, Button, Callout, Text} from '@radix-ui/themes';
import { useState} from "react";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { createIssueSchema } from '@/app/validationSchema';
import { z } from "zod"
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';


type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {

    const router = useRouter()

    const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })

    const [error, setError] = useState('')

    const submitForm = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            await axios.post("/api/issues", data);
            router.push('/issues');
        } catch (error) {
            setError("Make sure to fill in all of the fields")
            setSubmitting(false)
            //alert("An error occurred while submitting the form. Common:     1.) No Title or Description 2.) No SQL server connection.");
        }
    })

    const [submitting, setSubmitting] = useState(false)


    return ( 
        <div className='max-w-xl '>
            
            <form 
                className='space-y-3' 
                onSubmit={submitForm}
            >
                <TextField.Root placeholder='Title' {...register('title')}>
                    <TextField.Slot />
                </TextField.Root>
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <Controller 
                    name='description' 
                    control={control}
                    render={({ field }) => 
                        <SimpleMDE placeholder='Description' {...field} />
                    }
                />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
            
                <Button disabled={submitting}>Submit New Issue {submitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage
