class Api::UploadsController < ApplicationController
    def set_s3_direct_post
        filename = params[:filename]
        file_type = params[:fileType]
        random_path = SecureRandom.uuid
        key = "#{random_path}/#{filename}"
        signer = Aws::S3::Presigner.new
        post_url = signer.presigned_url(:put_object, bucket: "clonebin", key: key, acl: 'bucket-owner-full-control', content_type: file_type)
        get_url = "https://clonebin.s3-us-west-1.amazonaws.com/#{key}"
        render json: {post_url: post_url, get_url: get_url}
    end
end