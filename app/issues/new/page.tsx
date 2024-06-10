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


type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {

    const router = useRouter()

    const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })

    const [error, setError] = useState('')

    const submitForm = async(data: object) => {
        try {
            const response = await axios.post("/api/issues", data);
            console.log(response, data)
            router.push('/issues');
        } catch (error) {
            null
            setError("Make sure to fill in all of the fields")
            //alert("An error occurred while submitting the form. Common:     1.) No Title or Description 2.) No SQL server connection.");
        }
    }

    return ( 
        <div className='max-w-xl '>
                            
                {error && <Callout.Root color="red" className="mb-5">
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>}
            
            <form 
                className='space-y-3' 
                onSubmit={handleSubmit((data) => {
                    submitForm(data)
                }
            )}>
                <TextField.Root placeholder='Title' {...register('title')}>
                    <TextField.Slot />
                </TextField.Root>
                {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
                <Controller 
                    name='description' 
                    control={control}
                    render={({ field }) => 
                        <SimpleMDE placeholder='Description' {...field} />
                    }
                />
                {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
                <Button>Submit New Issue</Button>
            
            </form>
        </div>
    )
}

export default NewIssuePage
