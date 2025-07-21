import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Eye, EyeOff } from 'lucide-react';

function PasswordInput({ className, ...props }: React.ComponentProps<'input'>) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='relative'>
            <Input
                type={showPassword ? 'text' : 'password'}
                className={cn('pr-10', className)}
                {...props}
            />
            <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide Password' : 'Show Password'}
                className='absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700'
            >
                {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                ) : (
                    <Eye className='h-5 w-5' />
                )}
            </button>
        </div>
    )
}

export { PasswordInput };