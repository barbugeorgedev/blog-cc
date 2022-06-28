import Link from 'next/link'

const Category = ({ category }) => {
  return (
    <Link href={`/blog/category/${category.attributes.name}`}>
      <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
          {category.attributes.name}
      </a>
    </Link>
  )
}

export default Category
