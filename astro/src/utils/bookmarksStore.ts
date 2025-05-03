import { atom } from 'nanostores'

const LOCAL_STORAGE_KEY = 'bookmarkedProducts'

export const bookmarksStore = atom<string[]>([])

const loadBookmarks = () => {
    const storedBookmarks = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedBookmarks) {
        try {
            const parsedBookmarks = JSON.parse(storedBookmarks)
            if (Array.isArray(parsedBookmarks) && parsedBookmarks.every(item => typeof item === 'string')) {
                bookmarksStore.set(parsedBookmarks)
            } else {
                localStorage.removeItem(LOCAL_STORAGE_KEY)
            }
        } catch {
            localStorage.removeItem(LOCAL_STORAGE_KEY)
        }
    }
}

loadBookmarks()

bookmarksStore.subscribe((bookmarkedIds) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarkedIds))
})

export function addBookmark(id: string) {
    const currentBookmarks = bookmarksStore.get()
    if (!currentBookmarks.includes(id)) {
        bookmarksStore.set([...currentBookmarks, id])
    }
}

export function removeBookmark(id: string) {
    const currentBookmarks = bookmarksStore.get()
    bookmarksStore.set(currentBookmarks.filter((bookmarkedId) => bookmarkedId !== id))
}