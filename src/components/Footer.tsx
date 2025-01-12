import Link from 'next/link'
import { useContext } from 'react'

export function GitHubIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M8 .198a8 8 0 0 0-8 8 7.999 7.999 0 0 0 5.47 7.59c.4.076.547-.172.547-.384 0-.19-.007-.694-.01-1.36-2.226.482-2.695-1.074-2.695-1.074-.364-.923-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.224 1.873.87 2.33.666.072-.518.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.954 0-.873.31-1.586.823-2.146-.09-.202-.36-1.016.07-2.118 0 0 .67-.214 2.2.82a7.67 7.67 0 0 1 2-.27 7.67 7.67 0 0 1 2 .27c1.52-1.034 2.19-.82 2.19-.82.43 1.102.16 1.916.08 2.118.51.56.82 1.273.82 2.146 0 3.074-1.87 3.75-3.65 3.947.28.24.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.14.46.55.38A7.972 7.972 0 0 0 16 8.199a8 8 0 0 0-8-8Z" />
    </svg>
  )
}

function EditorFooter() {

  
  return (
    <div
      className={
        'px-5 bg-gray-100 absolute bottom-0 w-full border border-gray-200 dark:border-darkMode-primary text-xs h-[42px] items-center text-gray-600 ml-auto flex justify-between'
        }
    >
      <div className="flex items-center justify-end divide-x divide-gray-200 dark:divide-black-500">
        <span className="pr-4">
          Made with ❤️ by{' '}
          <a
            className="underline font-medium"
            href="https://walnut.dev"
            target="_blank"
            rel="noreferrer"
          >
            Walnut
          </a>
        </span>
      </div>
      <Link href={'https://github.com/walnuthq/noir-libs-client'} className='flex items-center gap-2 hover:text-blue-500'>
        <span>GitHub</span>
        <GitHubIcon className='w-4 h-4'/>
      </Link>
    </div>
  )
}

export default EditorFooter
