$(document).ready(() => {
    const $addCommentButton = $('button#add-comment-button');
    const $commentTextarea = $('textarea#comment-textarea');
    const $postCard = $('#post-card');
    
    $addCommentButton.on('click', () => {
        const commentData = {
            text: $commentTextarea.val().trim(),
            postId: $postCard.data('id')
        };

        if (!commentData.text || !commentData.postId) return;

        postComment(commentData.text, commentData.postId);

        $commentTextarea.val('');
    })

    async function postComment (text, postId) {
        try {
            $.post('/api/comments', {
                text: text,
                PostId: postId
            });
            location.reload();
        } catch (err) {
            console.log(err);
        }
    }
});
