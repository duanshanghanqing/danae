const axios = require('axios');
const urlJoin = require('url-join');
const semver = require('semver');

const registry = 'http://registry.npmjs.org';

// 获取包信息
async function getNpmInfo(npmName) {
    // http://registry.npmjs.org/@imooc-cli/core
    if (!npmName) {
        return null;
    }

    const npmInfoUrl = urlJoin(registry, npmName);
    // console.log(npmInfoUrl);
    let res;
    try {
        res = await axios.get(npmInfoUrl);
    } catch (error) {
        // console.error('获取包信息失败');
    }
    if (res && res.status === 200) {
        return res.data;
    }
    return null;
}

// 获取包版本的列表
async function getNpmVersions(npmName) {
    const data = await getNpmInfo(npmName);
    if (data && data.versions && typeof data.versions === 'object') {
        let versions = Object.keys(data.versions);
        versions = versions.filter((v) => !v.includes('-') && semver.valid(v)); // 0.11.0-rc1, 过滤掉带 "-" 一般不用于生产环境的, 并且是一个合法版本号
        versions = [...new Set(versions)];// 去重
        versions = versions.sort((a, b) => semver.gt(a, b)); // 从小到大排序
        // console.log(JSON.stringify(versions));
        return versions;
    }
    return [];
}

// 获取满足高于当前包版本号的版本列表
async function getSemverVersions(currentVersion, npmName) {
    let versions = [];
    try {
        versions = await getNpmVersions(npmName);
    } catch (error) {
    }
    // 返回大于当前版本号的版本
    const newVersions = versions.filter((version) => semver.lt(currentVersion, version));
    return newVersions;
}

// 获取最大版本号
async function getNpmLatestVersion(npmName) {
    let versions = await getNpmVersions(npmName);
    if (Array.isArray(versions) && versions.length > 0) {
        return versions[versions.length - 1];
    }
    return null;
}

module.exports = {
    registry,
    getNpmInfo,
    getNpmVersions,
    getSemverVersions,
    getNpmLatestVersion,
}
