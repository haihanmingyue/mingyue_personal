import request from "@/utils/request";
import views from "@/utils/views"


export const getFileList = (attachSubType) => {
    return request({
        url: `/attach/findBySubType`,
        method: "post",
        data: { attachSubType: attachSubType }
    });
}

export const getRole = () => {
    return request({
        url: `/userrole/getRole`,
        method: "post"
    });
}

export const upload = (fileToUpload,subType,fileObj) => {
    const formData = new FormData();
    formData.append("fileToUpload", fileToUpload);
    formData.append("subType", subType);
    return request({
        headers: { "Content-Type": "multipart/form-data" },
        url: `/attach/upload`,
        method: "POST",
        data: formData,
        onUploadProgress: progressEvent => {
            const num = (progressEvent.loaded / progressEvent.total * 100 | 0)
            if (fileObj) {
                fileObj.onProgress({percent: num })
            }
        }
    });
};

export const saveAttachType = (data) => {
    return request({
        headers: { "Content-Type": "application/json" },
        url: `/attachType/save`,
        method: "POST",
        data
    });
};


export const saveAttachSubType = (data) => {
    return request({
        headers: { "Content-Type": "application/json" },
        url: `/attachSubType/save`,
        method: "POST",
        data
    });
};

export const attachTypeList = (data) => {
    return request({
        url: `/attachType/list`,
        method: "POST",
        data
    });
};

export const attachSubTypeList = (data) => {
    return request({
        url: `/attachSubType/list`,
        method: "POST",
        data
    });
};

export const login = (data) => {
    return request({
        url: `/user/login`,
        method: "post",
        data
    });
};

export const loginOut = (data) => {
    return request({
        url: `/user/loginOut`,
        method: "post",
        data
    });
};

export const registerAccount = (data) => {
    return request({
        headers: { "Content-Type": "application/json" },
        url: `/user/register`,
        method: "post",
        data
    });
};
