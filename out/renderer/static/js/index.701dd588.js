(() => {
"use strict";
var __webpack_modules__ = ({
597: (function (__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

// EXTERNAL MODULE: ./node_modules/.pnpm/react@18.3.1/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(70);
;// CONCATENATED MODULE: ./src/renderer/src/assets/main.css
// extracted by css-extract-rspack-plugin

// EXTERNAL MODULE: ./node_modules/.pnpm/react@18.3.1/node_modules/react/index.js
var react = __webpack_require__(758);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-dom@18.3.1_react@18.3.1/node_modules/react-dom/client.js
var client = __webpack_require__(576);
;// CONCATENATED MODULE: ./src/renderer/src/components/Sidebar.tsx


function Sidebar(param) {
    let { posts, selectedPostId, onPostSelect } = param;
    const [searchQuery, setSearchQuery] = (0,react.useState)('');
    const pinnedPosts = posts.filter((post)=>post.category === 'pinned');
    const otherPosts = posts.filter((post)=>post.category === 'other');
    const filterPosts = (postsList)=>{
        return postsList.filter((post)=>post.title.toLowerCase().includes(searchQuery.toLowerCase()));
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("aside", {
        className: "sidebar",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "sidebar-header",
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "logo",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                            className: "logo-icon",
                            children: "WP"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                            className: "logo-text",
                            children: "WP-Notes"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: "search-box",
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                    type: "text",
                    placeholder: "Search",
                    value: searchQuery,
                    onChange: (e)=>setSearchQuery(e.target.value)
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("nav", {
                className: "nav-menu",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                        href: "#",
                        className: "nav-item active",
                        children: "Blog"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                        href: "#",
                        className: "nav-item",
                        children: "Portfolio"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                        href: "#",
                        className: "nav-item",
                        children: "Contact"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "posts-list",
                children: [
                    pinnedPosts.length > 0 && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "posts-section",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                                className: "section-title",
                                children: "PINNED"
                            }),
                            filterPosts(pinnedPosts).map((post)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: `post-item ${selectedPostId === post.id ? 'active' : ''}`,
                                    onClick: ()=>onPostSelect(post.id),
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("h4", {
                                            className: "post-title",
                                            children: post.title
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                            className: "post-excerpt",
                                            children: post.excerpt
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                            className: "post-date",
                                            children: post.date
                                        })
                                    ]
                                }, post.id))
                        ]
                    }),
                    otherPosts.length > 0 && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "posts-section",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                                className: "section-title",
                                children: "OTHER"
                            }),
                            filterPosts(otherPosts).map((post)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: `post-item ${selectedPostId === post.id ? 'active' : ''}`,
                                    onClick: ()=>onPostSelect(post.id),
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("h4", {
                                            className: "post-title",
                                            children: post.title
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                            className: "post-excerpt",
                                            children: post.excerpt
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                            className: "post-date",
                                            children: post.date
                                        })
                                    ]
                                }, post.id))
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                        className: "view-all-btn",
                        children: "All Posts"
                    })
                ]
            })
        ]
    });
}
/* export default */ const components_Sidebar = (Sidebar);

;// CONCATENATED MODULE: ./src/renderer/src/components/MainContent.tsx


function MainContent(param) {
    let { post } = param;
    const [commentForm, setCommentForm] = (0,react.useState)({
        name: '',
        email: '',
        website: '',
        comment: ''
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log('Comment submitted:', commentForm);
    // TODO: 实现评论提交逻辑
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("main", {
        className: "main-content",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("article", {
                className: "article",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("header", {
                        className: "article-header",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                                className: "article-title",
                                children: post.title
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "article-meta",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                        children: post.date
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                        children: [
                                            " / By ",
                                            post.author
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                        children: [
                                            " / ",
                                            post.commentCount,
                                            " Comments"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "article-body",
                        dangerouslySetInnerHTML: {
                            __html: post.content
                        }
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("footer", {
                        className: "article-footer",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                            className: "tags",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                    className: "tags-label",
                                    children: "Tags:"
                                }),
                                post.tags.map((tag, index)=>/*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                                        href: "#",
                                        className: "tag",
                                        children: tag
                                    }, index))
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("section", {
                className: "comments-section",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("h2", {
                        className: "comments-title",
                        children: [
                            post.comments.length,
                            " Comments"
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "comments-list",
                        children: post.comments.map((comment)=>/*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "comment",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                        className: "comment-avatar",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
                                            src: comment.avatar,
                                            alt: comment.author
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "comment-content",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                className: "comment-header",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                        className: "comment-author",
                                                        children: comment.author
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("span", {
                                                        className: "comment-date",
                                                        children: [
                                                            " / ",
                                                            comment.date
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                className: "comment-text",
                                                children: comment.content
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                                                className: "comment-reply",
                                                children: "Reply"
                                            })
                                        ]
                                    })
                                ]
                            }, comment.id))
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "comment-form-section",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                                className: "comment-form-title",
                                children: "Post Comment"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
                                className: "comment-form",
                                onSubmit: handleSubmit,
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "form-row",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                                className: "form-group",
                                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                                                    type: "text",
                                                    placeholder: "Name*",
                                                    value: commentForm.name,
                                                    onChange: (e)=>setCommentForm({
                                                            ...commentForm,
                                                            name: e.target.value
                                                        }),
                                                    required: true
                                                })
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                                className: "form-group",
                                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                                                    type: "email",
                                                    placeholder: "Email*",
                                                    value: commentForm.email,
                                                    onChange: (e)=>setCommentForm({
                                                            ...commentForm,
                                                            email: e.target.value
                                                        }),
                                                    required: true
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                        className: "form-group",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                                            type: "url",
                                            placeholder: "Website",
                                            value: commentForm.website,
                                            onChange: (e)=>setCommentForm({
                                                    ...commentForm,
                                                    website: e.target.value
                                                })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                        className: "form-group",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("textarea", {
                                            placeholder: "Your Comment",
                                            value: commentForm.comment,
                                            onChange: (e)=>setCommentForm({
                                                    ...commentForm,
                                                    comment: e.target.value
                                                }),
                                            rows: 6,
                                            required: true
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                                        type: "submit",
                                        className: "submit-btn",
                                        children: "Post Comment"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
}
/* export default */ const components_MainContent = (MainContent);

;// CONCATENATED MODULE: ./src/renderer/src/components/Footer.tsx

function Footer() {
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("footer", {
        className: "app-footer",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "footer-content",
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "footer-logo",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                            className: "logo-icon",
                            children: "WP"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                            className: "logo-text",
                            children: "WP-Notes"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "footer-info",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                            children: "Holo theme by "
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                            href: "#",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: "WPThemes"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                            children: " | "
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                            href: "#",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: "Privacy"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "footer-social",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                            href: "#",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: "Instagram"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                            href: "#",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: "Twitter"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                            href: "#",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: "Facebook"
                        })
                    ]
                })
            ]
        })
    });
}
/* export default */ const components_Footer = (Footer);

;// CONCATENATED MODULE: ./src/renderer/src/App.tsx





// 模拟数据
const mockPosts = [
    {
        id: 1,
        title: 'Light & Bright in Brooklyn',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui.',
        date: 'Feb 8, 2021',
        category: 'pinned'
    },
    {
        id: 2,
        title: 'Business Partners Work at Modern Office',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui.',
        date: 'Feb 8, 2021',
        category: 'other'
    },
    {
        id: 3,
        title: 'Light & Bright in Brooklyn',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui.',
        date: 'Feb 8, 2021',
        category: 'other'
    },
    {
        id: 4,
        title: 'Business Partners Work at Modern Office',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui.',
        date: 'Feb 8, 2021',
        category: 'other'
    }
];
const mockPostContent = {
    id: 2,
    title: 'Business Partners Work at Modern Office',
    author: 'VitalThemes',
    date: 'Feb 8, 2021',
    commentCount: 3,
    content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui. Lorem ipsum dolor sit amet, consectetur adipisce placerat mauris nisl. Proin vitae urna <a href="#">sem pellentesque</a> laoreet.</p>
    
    <div class="article-image">
      <img src="data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23f5f5f5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26' fill='%23999'%3EImage%3C/text%3E%3C/svg%3E" alt="Article image" />
    </div>

    <h2>Light & Bright in Brooklyn 🎨</h2>
    
    <p>Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat mauris nisl:</p>
    
    <ul>
      <li>Lorem ipsum dolor sit amet</li>
      <li>consectetur adipiscing elit. Sed at arcu dui</li>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
      <li>Sed at arcu dui</li>
    </ul>
    
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat mauris nisl.</p>
    
    <blockquote>
      <p>" Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui. Aenean placerat. "</p>
      <cite>Walter Dave</cite>
    </blockquote>
    
    <h3>Privacy & Sync</h3>
    
    <ol>
      <li>Lorem ipsum dolor sit amet</li>
      <li>consectetur adipiscing elit. Sed at arcu dui</li>
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
    </ol>
  `,
    tags: [
        'Privacy',
        'Business',
        'Office'
    ],
    comments: [
        {
            id: 1,
            author: 'Jewel',
            date: 'Feb 8, 2021',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui.',
            avatar: 'data:image/svg+xml,%3Csvg width="40" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="40" height="40" fill="%23FF9966"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="white"%3EJ%3C/text%3E%3C/svg%3E'
        },
        {
            id: 2,
            author: 'Jewel',
            date: 'Feb 8, 2021',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui.',
            avatar: 'data:image/svg+xml,%3Csvg width="40" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="40" height="40" fill="%23FF9966"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="white"%3EJ%3C/text%3E%3C/svg%3E'
        },
        {
            id: 3,
            author: 'Jewel',
            date: 'Feb 8, 2021',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu dui. Sed at arcu Lorem ipsum dolor sit amet.',
            avatar: 'data:image/svg+xml,%3Csvg width="40" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="40" height="40" fill="%23FF9966"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="white"%3EJ%3C/text%3E%3C/svg%3E'
        }
    ]
};
function App() {
    const [selectedPostId, setSelectedPostId] = (0,react.useState)(2);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "app-container",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(components_Sidebar, {
                posts: mockPosts,
                selectedPostId: selectedPostId,
                onPostSelect: setSelectedPostId
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "main-wrapper",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(components_MainContent, {
                        post: mockPostContent
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(components_Footer, {})
                ]
            })
        ]
    });
}
/* export default */ const src_App = (App);

;// CONCATENATED MODULE: ./src/renderer/src/main.tsx





client.createRoot(document.getElementById('root')).render(/*#__PURE__*/ (0,jsx_runtime.jsx)(react.StrictMode, {
    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(src_App, {})
}));


}),

});
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

// expose the modules object (__webpack_modules__)
__webpack_require__.m = __webpack_modules__;

// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();
// webpack/runtime/on_chunk_loaded
(() => {
var deferred = [];
__webpack_require__.O = (result, chunkIds, fn, priority) => {
	if (chunkIds) {
		priority = priority || 0;
		for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--)
			deferred[i] = deferred[i - 1];
		deferred[i] = [chunkIds, fn, priority];
		return;
	}
	var notFulfilled = Infinity;
	for (var i = 0; i < deferred.length; i++) {
		var [chunkIds, fn, priority] = deferred[i];
		var fulfilled = true;
		for (var j = 0; j < chunkIds.length; j++) {
			if (
				(priority & (1 === 0) || notFulfilled >= priority) &&
				Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))
			) {
				chunkIds.splice(j--, 1);
			} else {
				fulfilled = false;
				if (priority < notFulfilled) notFulfilled = priority;
			}
		}
		if (fulfilled) {
			deferred.splice(i--, 1);
			var r = fn();
			if (r !== undefined) result = r;
		}
	}
	return result;
};

})();
// webpack/runtime/jsonp_chunk_loading
(() => {

      // object to store loaded and loading chunks
      // undefined = chunk not loaded, null = chunk preloaded/prefetched
      // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
      var installedChunks = {"410": 0,};
      __webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
// install a JSONP callback for chunk loading
var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
	var [chunkIds, moreModules, runtime] = data;
	// add "moreModules" to the modules object,
	// then flag all "chunkIds" as loaded and fire callback
	var moduleId, chunkId, i = 0;
	if (chunkIds.some((id) => (installedChunks[id] !== 0))) {
		for (moduleId in moreModules) {
			if (__webpack_require__.o(moreModules, moduleId)) {
				__webpack_require__.m[moduleId] = moreModules[moduleId];
			}
		}
		if (runtime) var result = runtime(__webpack_require__);
	}
	if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
	for (; i < chunkIds.length; i++) {
		chunkId = chunkIds[i];
		if (
			__webpack_require__.o(installedChunks, chunkId) &&
			installedChunks[chunkId]
		) {
			installedChunks[chunkId][0]();
		}
		installedChunks[chunkId] = 0;
	}
	return __webpack_require__.O(result);
};

var chunkLoadingGlobal = self["webpackChunkhatersnote"] = self["webpackChunkhatersnote"] || [];
chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));

})();
// startup
// Load entry module and return exports
// This entry module depends on other loaded chunks and execution need to be delayed
var __webpack_exports__ = __webpack_require__.O(undefined, ["783"], function() { return __webpack_require__(597) });
__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
})()
;