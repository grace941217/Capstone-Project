class CommentsController < ApplicationController
    def index
        render json: Comment.all.order('created_at DESC'), each_serializer: CommentUserSerializer, status: :ok
    end

    def show
        comment = find_comment
        render json: comment, status: :ok
    end

    def update
        comment = find_comment
        comment.update!(comment_params)
        render json: comment.order('created_at DESC'), status: :accepted
    end

    def create
        comment = Comment.create!(comment_params)
        render json: comment, status: :created
    end

    def destroy
        comment = find_comment
        comment.destroy
        head :no_content
    end

    private

    def find_comment
        Comment.find(params[:id])
    end

    def comment_params
        params.permit(:post_comment, :user_id, :post_id)
    end
end
