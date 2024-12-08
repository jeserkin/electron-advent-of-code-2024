const capitalizeFirstLetter = (input) => {
    return String(input).charAt(0).toUpperCase() + String(input).slice(1);
};

const loadTemplateIntoAreaById = async (areaId, templatePath) => {
    const area = document.getElementById(areaId);
    const areaContentTemplate = await window.api.readFile(templatePath);
    area.innerHTML = areaContentTemplate.content;
};

const loadTemplateIntoArea = async (areaIdentifier, templatePath) => {
    const area = document.querySelector(areaIdentifier);
    const areaContentTemplate = await window.api.readFile(templatePath);
    area.innerHTML = areaContentTemplate.content;
};

const updateMainContentArea = async (templatePath) => {
    await loadTemplateIntoAreaById('main-content', templatePath);
};

const registerHomeNavigation = () => {
    document.getElementById('home').addEventListener('click', async () => {
        await updateMainContentArea('src/welcome-message.html');
    });
};

const attemptToSolveProblem = async (input, contentId) => {
    const solution = await window.api.readFile(`src/solutions/${contentId}/solution.js`);
    const attempt = new Function(`return ${solution.content}`)();

    const result = document.getElementById('puzzle-result');
    result.innerHTML = `Result: ${attempt(input)}`;
};

const displayPuzzleProblem = async (contentId, fileName) => {
    await updateMainContentArea(`src/solutions/${contentId}/${fileName}`);
    await loadTemplateIntoArea('.file-upload-area', 'src/file-upload.html');

    const fileInput = document.getElementById('file-upload');
    fileInput.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];

        const reader = new FileReader();
        reader.onload = async (e) => {
            await attemptToSolveProblem(e.target.result, contentId);
        };
        reader.readAsText(selectedFile);
    });
};

const displayPuzzle = async (contentId) => {
    await displayPuzzleProblem(contentId, 'problem.html');
};

const fillSidebar = async () => {
    const puzzles = document.getElementById('puzzles');
    puzzles.innerHTML = '';

    try {
        const files = await window.api.readDirectory('src/solutions');

        if (files.error) {
            puzzles.innerHTML = `<li>No puzzles</li>`;
        } else {
            files.forEach(file => {
                const puzzleActivation = document.createElement('button');
                puzzleActivation.setAttribute('class', 'sidebar-item btn btn-link text-white')
                puzzleActivation.setAttribute('data-content', `${file.name}`)
                puzzleActivation.textContent = `${file.name.split('_').map(nameSegment => capitalizeFirstLetter(nameSegment)).join(' ')}`;

                puzzleActivation.addEventListener('click', () => {
                    const contentId = puzzleActivation.getAttribute('data-content');
                    displayPuzzle(contentId);
                });

                const puzzle = document.createElement('li');
                puzzle.appendChild(puzzleActivation);
                puzzles.appendChild(puzzle);
            });
        }
    } catch (error) {
        puzzles.innerHTML = `<li>No puzzles</li>`;
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    await fillSidebar();
    await updateMainContentArea('src/welcome-message.html');

    registerHomeNavigation();
});