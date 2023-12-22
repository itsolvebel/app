'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { login, register } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { fetcher } from '@/lib/fetcher'

type Form = {
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
}

type FieldErrors = {
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
}


export function RegisterForm() {
  const [form, setForm] = useState<Form>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })
  const router = useRouter()

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
    setFieldErrors((prev) => ({ ...prev, [id]: '' }))
  }

  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter')
      handleOnSubmit()
  }

  const handleOnSubmit = () => {
    const newFieldErrors: FieldErrors = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    }
    let changed = false

    Object.entries(form).forEach(([id, value]) => {
      if (!value) {
        newFieldErrors[id as keyof FieldErrors] = 'This field is required'
        changed = true
      }
    })

    if (changed) {
      setFieldErrors(newFieldErrors)
      return
    }

    register(form).then((res) => {
      const success = res.message === 'Signup successfully'
      if (success) {
        login(
          {
            email_or_username: form.email,
            password: form.password,
          },
        ).then((loginResult) => {
          fetcher.setToken(loginResult.access_token)
          router.replace('/')
        })
      } else {
        toast.error(res.message)
      }
    })
  }

  return (
    <div className='flex h-full w-full flex-col justify-center gap-8 px-4 py-16 sm:px-24'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold text-white'>Sign up</h1>
        <span className='font-medium text-white/80'>
          Let&apos;s create your ItSolve account first.
        </span>
      </div>
      <div className='flex flex-col gap-8'>
        <div className='flex w-full flex-col gap-2'>
          <label className='font-medium text-white/80'>
            Username <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            placeholder='john.doe'
            id='username'
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            className={`w-full rounded-lg border-2 border-[#FFFFFF1A] bg-transparent px-4 py-2 text-white outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none ${
              fieldErrors.username && 'error-border'
            }`}
          />
          {fieldErrors.username && (
            <span className='text-red-500'>{fieldErrors.username}</span>
          )}
        </div>

        <div className='flex w-full gap-4 sm:gap-12'>
          <div className='flex w-full flex-col gap-2'>
            <label className='font-medium text-white/80'>
              First name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              placeholder='John'
              id='first_name'
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              className={`w-full rounded-lg border-2 border-[#FFFFFF1A] bg-transparent px-4 py-2 text-white outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none ${
                fieldErrors.first_name && 'error-border'
              }`}
            />
            {fieldErrors.first_name && (
              <span className='text-red-500'>{fieldErrors.first_name}</span>
            )}
          </div>
          <div className='flex w-full flex-col gap-2'>
            <label className='font-medium text-white/80'>
              Last name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              placeholder='Doe'
              id='last_name'
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              className={`w-full rounded-lg border-2 border-[#FFFFFF1A] bg-transparent px-4 py-2 text-white outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none ${
                fieldErrors.last_name && 'error-border'
              }`}
            />
            {fieldErrors.last_name && (
              <span className='text-red-500'>{fieldErrors.last_name}</span>
            )}
          </div>
        </div>

        <div className='flex w-full flex-col gap-2'>
          <label className='font-medium text-white/80'>
            Email address <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            placeholder='john@itsolve.be'
            id='email'
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            className={`w-full rounded-lg border-2 border-[#FFFFFF1A] bg-transparent px-4 py-2 text-white outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none ${
              fieldErrors.email && 'error-border'
            }`}
          />
          {fieldErrors.email && (
            <span className='text-red-500'>{fieldErrors.email}</span>
          )}
        </div>

        <div className='flex w-full flex-col gap-2'>
          <label className='font-medium text-white/80'>
            Password <span className='text-red-500'>*</span>
          </label>
          <input
            type='password'
            placeholder='•••••••••'
            id='password'
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            className={`w-full rounded-lg border-2 border-[#FFFFFF1A] bg-transparent px-4 py-2 text-white outline-none duration-300 focus:border-[#01A0C4] focus:bg-[#01A0C405] focus:outline-none ${
              fieldErrors.password && 'error-border'
            }`}
          />
          {fieldErrors.password && (
            <span className='text-red-500'>{fieldErrors.password}</span>
          )}
        </div>

        <div>
          <button
            className='rounded-lg bg-[#01A0C4] px-8 py-4 font-medium text-white duration-300 hover:bg-[#25C3E6]'
            onClick={() => handleOnSubmit()}
          >
            Create account
          </button>
        </div>

        <div>
          <span className='font-medium text-white/80'>
            Already have an account?{' '}
          </span>
          <Link href='/login' className='font-medium text-[#01A0C4]'>
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
