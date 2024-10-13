'use client'

const HomeError = ({ error, reset }: any) => {
    return (
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button>
        </div>
    )
}

export default HomeError
