module.exports = {
    browserifyLink: (link) => {
        return !link.match(/^(http|https):\/\//i) ? `http://${link}` : link;
    },
    copyToClipboard: (textToCopy) => {
        const tempElement = document.createElement('textarea');
        tempElement.value = textToCopy;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);
    }
};
