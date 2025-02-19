
# Cat Gallery

A responsive cat gallery application built with React that supports both infinite scroll and pagination for fetching and displaying cat images. The app also uses local storage to save and load previously fetched cat images.

## Features

- **Infinite Scroll:** Automatically loads more cats as the user scrolls down.
- **Pagination:** Allows manual navigation through pages of cats.
- **Local Storage:** Saves fetched cats in local storage and loads them on component mount.
- **Responsive Design:** Adapts to various screen sizes with a grid layout.

## Technologies Used

- React
- Tailwind CSS
- Local Storage
- Intersection Observer API
- Custom Hooks

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/cat-gallery.git
    cd cat-gallery
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

### Running the Application

To start the development server, run:

```sh
npm start
```

The app will be available at `http://localhost:3000`.

## Live Demo

You can view the live demo of the application at: [Cat Gallery Live Demo](http://leadsqureprafful.s3-website.ap-south-1.amazonaws.com/)

## Usage

- **Load Cats:** Click the 'Load Cats' button to fetch the initial set of cat images.
- **Toggle Infinite Scroll/Pagination:** Use the toggle button to switch between infinite scroll and pagination.
- **Pagination Controls:** Navigate through pages using the 'Previous' and 'Next' buttons (only in pagination mode).

## Project Structure

```
cat-gallery/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   ├── CatCard.jsx
│   │   ├── CatGallery.jsx
│   ├── hooks/
│   │   ├── useCatGallery.js
│   ├── App.js
│   ├── index.js
├── .gitignore
├── package.json
├── README.md
├── tailwind.config.js
```

## Custom Hooks

### useCatGallery

A custom hook for managing the state and fetching of cat images.

#### State Variables

- `cats`: List of cat images.
- `loading`: Boolean indicating if a fetch request is in progress.
- `error`: Error message, if any.
- `currentPage`: Current page number.
- `hasMore`: Boolean indicating if there are more cats to load.
- `isInitialized`: Boolean indicating if the initial fetch is done.

#### Methods

- `fetchCats(page, append)`: Fetches cat images for a given page. If `append` is true, appends the new cats to the existing list.

## Contributing

Contributions are welcome! Please create an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

### Notes

- Replace `https://github.com/your-username/cat-gallery.git` with your actual GitHub repository URL.
- Make sure the instructions and features accurately reflect your project.
