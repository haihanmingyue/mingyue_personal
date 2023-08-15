import request from "@/utils/request";
import views from "@/utils/views"


export const getFileList = (attachSubType, pageNum = 1, pageSize = 999) => {
    return request({
        url: `/attach/findBySubType`,
        method: "post",
        data: { attachSubType: attachSubType, pageNum: pageNum ,pageSize: pageSize }
    });
}

export const getRole = () => {
    return request({
        url: `/userMenu/getRoleList`,
        method: "post"
    });
}

export const getCode = (email) => {
    return request({
        url: `email/getCode`,
        method: "post",
        data: {
            email: email
        }
    })
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
            let num = (progressEvent.loaded / progressEvent.total * 100 | 0)
            if (num >= 100) {
                num = 99;
            }
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

export const checkLogin = (data) => {
    return request({
        url: `/user/checkLogin`,
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
        url: `/user/register?code=${data.code}`,
        method: "post",
        data,
    });
};
