


let wrapper = document.getElementById("wrapper");

let {keys, hash} = init();
function init() {
    //  初始化数据
    let keys = {
        0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        length: 3,
    };

    let hash = {
        'q': 'qq.com',
        'w': 'weibo.com',
        'e': 'ele.com',
        'r': 'renren.com',
        't': 'tianya.com',
        'y': 'yy.com',
        'u': 'uc.com',
        'i': 'iqiyi.com',
        'p': undefined,
        'o': 'opera.com',
        'a': 'acfun.com',
        's': 'sohu.com',
        length: 12,
    };
    let localStorageHash = JSON.parse(localStorage.getItem("keyHash") || "null");
    if(localStorageHash) {
        hash = localStorageHash;
    }
    return {
        'keys': keys,
        'hash': hash,
    };
}

/**
 * 生成一个Element
 * @param tagName: tag名字
 * @param attribute：带有的属性
 * @param textContent: 带有的内容
 * @returns {HTMLElement | HTMLSelectElement | HTMLLegendElement | HTMLTableCaptionElement | HTMLTextAreaElement | HTMLModElement | HTMLHRElement | HTMLOutputElement | HTMLPreElement | HTMLEmbedElement | HTMLCanvasElement | HTMLFrameSetElement | HTMLMarqueeElement | HTMLScriptElement | HTMLInputElement | HTMLUnknownElement | HTMLMetaElement | HTMLStyleElement | HTMLObjectElement | HTMLTemplateElement | HTMLBRElement | HTMLAudioElement | HTMLIFrameElement | HTMLMapElement | HTMLTableElement | HTMLAnchorElement | HTMLMenuElement | HTMLPictureElement | HTMLParagraphElement | HTMLTableDataCellElement | HTMLTableSectionElement | HTMLQuoteElement | HTMLTableHeaderCellElement | HTMLProgressElement | HTMLLIElement | HTMLTableRowElement | HTMLFontElement | HTMLSpanElement | HTMLTableColElement | HTMLOptGroupElement | HTMLDataElement | HTMLDListElement | HTMLFieldSetElement | HTMLSourceElement | HTMLBodyElement | HTMLDirectoryElement | HTMLDivElement | HTMLUListElement | HTMLHtmlElement | HTMLAreaElement | HTMLMeterElement | HTMLAppletElement | HTMLFrameElement | HTMLOptionElement | HTMLImageElement | HTMLLinkElement | HTMLHeadingElement | HTMLSlotElement | HTMLVideoElement | HTMLBaseFontElement | HTMLTitleElement | HTMLButtonElement | HTMLHeadElement | HTMLParamElement | HTMLTrackElement | HTMLOListElement | HTMLDataListElement | HTMLLabelElement | HTMLFormElement | HTMLTimeElement | HTMLBaseElement}
 */
function createTag(tagName, attribute = {}, textContent = "") {
    let tag = document.createElement(tagName);
    for(let property in attribute) {
        tag[property] = attribute[property];
    }
    tag.textContent = textContent;
    return tag;
}

//  生成键盘
function generateKeyBoard(keys, hash) {
    for(let i = 0; i < keys.length; i++) {
        let row = keys[i];
        let keyContainer = createTag("div", "row" + i);
        wrapper.appendChild(keyContainer);
        for(let j = 0; j < row.length; j ++) {
            let kbd = createTag("kbd", {className: "keys"})
            let span = createTag("span", {}, row[j]);
            let button = createTag("button", {id: row[j]}, "编辑");
            let img = createTag("img");
            if(hash[row[j]]) {
                img.src = "http://" + hash[row[j]] + "/favicon.ico" || "null";
            } else {
                img.src = "./default_icon.png";
            }
            img.onerror = function(e) {
                e.target.src = "./default_icon.png";
            }

            keyContainer.appendChild(kbd);
            kbd.appendChild(span);
            kbd.appendChild(img);
            kbd.appendChild(button);
            button.onclick = function(e) {
                let keyValue = e.target.id;
                let newValue = prompt("给我一个网址:");
                hash[keyValue] = newValue;
                img.src = "http://" + hash[keyValue] + "/favicon.ico" || "null";
                img.onerror = function(e) {
                    e.target.src = "./default_icon.png";
                }
                localStorage.setItem("keyHash", JSON.stringify(hash));
            }
        }
    }
}

//   监听键盘
function listenToKeyBoard() {
    document.onkeypress = function(e) {
        let key = e.key;
        let href = "http://" + hash[key];
        window.open(href, '_blank');
    }
}

generateKeyBoard(keys, hash);

listenToKeyBoard();

// 处理事件


