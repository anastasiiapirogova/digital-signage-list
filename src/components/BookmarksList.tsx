import { useStore } from '@nanostores/react'
import { products } from '../utils/products'
import { ListItem } from './ListItem'
import { bookmarksStore } from '../utils/bookmarksStore'
import { useEffect, useState } from 'react'

export const BookmarksList = () => {
    const [bookmarks, setBookmarks] = useState<string[]>([])

    const $bookmarks = useStore(bookmarksStore)

    useEffect(() => {
        setBookmarks($bookmarks)
    }, [])

    const productList = products.filter((product) => bookmarks.includes(product.id))

    return (
        <div className='flex flex-col w-full gap-2'>
            {productList.map((product) => (
                <ListItem product={product} key={product.id} />
            ))}
        </div>
    )
}
