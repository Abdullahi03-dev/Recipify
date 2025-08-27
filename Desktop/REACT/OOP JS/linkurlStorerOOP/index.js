class Bookmark {
    static bookmarkArray = [];
    #id;

    constructor(name, url, id = null) {
        this.name = name;
        this.url = url;
        this.#id = id || Date.now(); // If id is provided, use it; else generate new
    }

    generatedId() {
        return this.#id;
    }

    // Save all bookmarks to localStorage
    static saveBookMarks() {
        const plainBookmarks = Bookmark.bookmarkArray.map(bookmark => ({
            text: bookmark.name,
            url: bookmark.url,
            _id: bookmark.generatedId()
        }));
        localStorage.setItem('bookapp', JSON.stringify(plainBookmarks));
    }

    // Load bookmarks from localStorage
    static loadBookmarks() {
        const saved = localStorage.getItem('bookapp');
        if (saved) {
            const parsed = JSON.parse(saved);
            const mappedParsed = parsed.map(bookmark => {
                return new Bookmark(bookmark.text, bookmark.url, bookmark._id);
            });
            Bookmark.bookmarkArray = mappedParsed;
        }
    }

    // Delete a bookmark by ID
    static deleteTodo(_id) {
        Bookmark.bookmarkArray = Bookmark.bookmarkArray.filter(bookmark => bookmark.generatedId() !== _id);
        Bookmark.saveBookMarks();
    }
}

class App {
    constructor() {
        this.nameinput = document.getElementById('siteName');
        this.siteinput = document.getElementById('siteURL');
        this.bookmarkList = document.getElementById('bookmarkList');
        this.button = document.getElementById('button');

        this.button.addEventListener('click', this.addBookmark.bind(this));
        this.bookmarkList.addEventListener('click', this.handleDelete.bind(this));

        Bookmark.loadBookmarks();
        this.render();
    }

    addBookmark() {
        const text = this.nameinput.value.trim();
        const textUrl = this.siteinput.value.trim();
        if (!text || !textUrl) return alert('Input should be filled');

        const newBookapp = new Bookmark(text, textUrl);
        Bookmark.bookmarkArray.push(newBookapp);
        Bookmark.saveBookMarks();
        this.render();

        this.nameinput.value = '';
        this.siteinput.value = '';
    }

    handleDelete(e) {
        if (e.target.tagName === 'BUTTON') {
            const id = parseInt(e.target.dataset.id);
            Bookmark.deleteTodo(id);
            this.render();
        }
    }

    render() {
        this.bookmarkList.innerHTML = '';
        Bookmark.bookmarkArray.forEach(char => {
            const div = document.createElement('div');
            div.id = 'listDiv';
            div.innerHTML = `
                <h3>NAME OF LINK: ${char.name}</h3>
                <h3>LINK: ${char.url}</h3>
                <button data-id="${char.generatedId()}">Delete</button>
            `;
            this.bookmarkList.appendChild(div);
        });
    }
}

new App();
