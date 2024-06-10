import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'

const ErrorMessage = ({children}: PropsWithChildren) => {
    if (!children) return null
    console.log(children)

    return (
        <Text color="red" as="p">{children}</Text>
    )
}

export default ErrorMessage
