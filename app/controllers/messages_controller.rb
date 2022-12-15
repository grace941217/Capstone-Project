class MessagesController < ApplicationController
    def index
        render json: Message.all, status: :ok
    end

    def show
        message = find_message
        render json: message, status: :ok
    end

    def update
        message = find_message
        message.update!(message_params)
        render json: message, status: :accepted
    end

    def create
        message = Message.create!(message_params)
        render json: message, status: :created
    end

    def destroy
        message = find_message
        message.destroy
        head :no_content
    end

    private

    def find_message
        Message.find(params[:id])
    end

    def message_params
        params.permit(:input)
    end
end
