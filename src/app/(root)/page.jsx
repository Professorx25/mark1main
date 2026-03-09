import ProjectsForm from '@/modules/home/components/project-form'
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <div className=' flex items-center justify-center w-full px-4 py-8'>
      <div className='max-w-5xl w-full'>
        <section className='space-y-8 flex flex-col items-center'>
          <div className='flex flex-col items-center'>
            <Image
              src="/logo.svg"
              alt="Logo"
              width={150}
              height={150}
              className='hidden md:block invert dark:invert-0'
            />
          </div>
          <h1 className='text-xl md:text-3xl font-bold text-center'>Built Something with ❤️</h1>
          <p className='text-sm md:text-sm text-muted-foreground text-center'>
            Create apps and websites by chatting with Mark1
          </p>
          <div className='max-w-3xl w-full'>
            <ProjectsForm/>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Page