'use client';


import { TextField, Button, Callout} from '@radix-ui/themes';
import { useState} from "react";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string;
    description: string;
}


const NewIssuePage = () => {

    const router = useRouter()

    const {register, control, handleSubmit} = useForm<IssueForm>()

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
                <Controller 
                    name='description' 
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <Button>Submit New Issue</Button>
            
            </form>
        </div>
    )
}

export default NewIssuePage
