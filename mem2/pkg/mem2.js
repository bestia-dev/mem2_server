
const __exports = {};
let wasm;

/**
*wasm_bindgen runs this functions at start
* @returns {void}
*/
export function run() {
    return wasm.run();
}

__exports.run = run;

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function __wbg_new_3a746f2619705add(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}

__exports.__wbg_new_3a746f2619705add = __wbg_new_3a746f2619705add;

function getObject(idx) { return heap[idx]; }

function __wbg_call_f54d3a6dadb199ca(arg0, arg1) {
    return addHeapObject(getObject(arg0).call(getObject(arg1)));
}

__exports.__wbg_call_f54d3a6dadb199ca = __wbg_call_f54d3a6dadb199ca;

function __wbg_self_ac379e780a0d8b94(arg0) {
    return addHeapObject(getObject(arg0).self);
}

__exports.__wbg_self_ac379e780a0d8b94 = __wbg_self_ac379e780a0d8b94;

function __wbg_crypto_1e4302b85d4f64a2(arg0) {
    return addHeapObject(getObject(arg0).crypto);
}

__exports.__wbg_crypto_1e4302b85d4f64a2 = __wbg_crypto_1e4302b85d4f64a2;

function __wbg_getRandomValues_1b4ba144162a5c9e(arg0) {
    return addHeapObject(getObject(arg0).getRandomValues);
}

__exports.__wbg_getRandomValues_1b4ba144162a5c9e = __wbg_getRandomValues_1b4ba144162a5c9e;

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

function __wbg_getRandomValues_1ef11e888e5228e9(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).getRandomValues(varg1);
}

__exports.__wbg_getRandomValues_1ef11e888e5228e9 = __wbg_getRandomValues_1ef11e888e5228e9;

function __wbg_require_6461b1e9a0d7c34a(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(require(varg0));
}

__exports.__wbg_require_6461b1e9a0d7c34a = __wbg_require_6461b1e9a0d7c34a;

function __wbg_randomFillSync_1b52c8482374c55b(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).randomFillSync(varg1);
}

__exports.__wbg_randomFillSync_1b52c8482374c55b = __wbg_randomFillSync_1b52c8482374c55b;

function __wbg_new_5ad3a30fd27500e6(arg0) {
    return addHeapObject(new ChangeList(getObject(arg0)));
}

__exports.__wbg_new_5ad3a30fd27500e6 = __wbg_new_5ad3a30fd27500e6;

function __wbg_unmount_b22efc123ce84986(arg0) {
    getObject(arg0).unmount();
}

__exports.__wbg_unmount_b22efc123ce84986 = __wbg_unmount_b22efc123ce84986;

function __wbg_addChangeListRange_5ae137ae4740d377(arg0, arg1, arg2) {
    getObject(arg0).addChangeListRange(arg1 >>> 0, arg2 >>> 0);
}

__exports.__wbg_addChangeListRange_5ae137ae4740d377 = __wbg_addChangeListRange_5ae137ae4740d377;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function __wbg_applyChanges_80aff4692bcb5634(arg0, arg1) {
    getObject(arg0).applyChanges(takeObject(arg1));
}

__exports.__wbg_applyChanges_80aff4692bcb5634 = __wbg_applyChanges_80aff4692bcb5634;

function __wbg_initEventsTrampoline_9d78568a584c1580(arg0, arg1) {
    getObject(arg0).initEventsTrampoline(getObject(arg1));
}

__exports.__wbg_initEventsTrampoline_9d78568a584c1580 = __wbg_initEventsTrampoline_9d78568a584c1580;

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

function handleError(exnptr, e) {
    const view = getUint32Memory();
    view[exnptr / 4] = 1;
    view[exnptr / 4 + 1] = addHeapObject(e);
}

function __widl_f_create_element_Document(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        return addHeapObject(getObject(arg0).createElement(varg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__widl_f_create_element_Document = __widl_f_create_element_Document;

function isLikeNone(x) {
    return x === undefined || x === null;
}

function __widl_f_get_element_by_id_Document(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);

    const val = getObject(arg0).getElementById(varg1);
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

__exports.__widl_f_get_element_by_id_Document = __widl_f_get_element_by_id_Document;

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {

        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let writeOffset = 0;
        while (true) {
            const view = getUint8Memory().subarray(ptr + writeOffset, ptr + size);
            const { read, written } = cachedTextEncoder.encodeInto(arg, view);
            writeOffset += written;
            if (read === arg.length) {
                break;
            }
            arg = arg.substring(read);
            ptr = wasm.__wbindgen_realloc(ptr, size, size += arg.length * 3);
        }
        WASM_VECTOR_LEN = writeOffset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {

        const buf = cachedTextEncoder.encode(arg);
        const ptr = wasm.__wbindgen_malloc(buf.length);
        getUint8Memory().set(buf, ptr);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    };
}

function __widl_f_id_Element(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).id);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

__exports.__widl_f_id_Element = __widl_f_id_Element;

function __widl_f_set_inner_html_Element(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    getObject(arg0).innerHTML = varg1;
}

__exports.__widl_f_set_inner_html_Element = __widl_f_set_inner_html_Element;

function __widl_f_target_Event(arg0) {

    const val = getObject(arg0).target;
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

__exports.__widl_f_target_Event = __widl_f_target_Event;

function __widl_f_new_with_src_Audio(arg0, arg1, exnptr) {
    let varg0 = getStringFromWasm(arg0, arg1);
    try {
        return addHeapObject(new Audio(varg0));
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__widl_f_new_with_src_Audio = __widl_f_new_with_src_Audio;

function __widl_instanceof_HTMLImageElement(idx) { return getObject(idx) instanceof HTMLImageElement ? 1 : 0; }

__exports.__widl_instanceof_HTMLImageElement = __widl_instanceof_HTMLImageElement;

function __widl_f_play_HTMLMediaElement(arg0, exnptr) {
    try {
        return addHeapObject(getObject(arg0).play());
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__widl_f_play_HTMLMediaElement = __widl_f_play_HTMLMediaElement;

function __widl_f_href_Location(ret, arg0, exnptr) {
    try {

        const retptr = passStringToWasm(getObject(arg0).href);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__widl_f_href_Location = __widl_f_href_Location;

function __widl_f_append_child_Node(arg0, arg1, exnptr) {
    try {
        return addHeapObject(getObject(arg0).appendChild(getObject(arg1)));
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__widl_f_append_child_Node = __widl_f_append_child_Node;

function __widl_f_get_Storage(ret, arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        const val = getObject(arg0)[varg1];
        const retptr = isLikeNone(val) ? [0, 0] : passStringToWasm(val);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__widl_f_get_Storage = __widl_f_get_Storage;

function __widl_f_new_WebSocket(arg0, arg1, exnptr) {
    let varg0 = getStringFromWasm(arg0, arg1);
    try {
        return addHeapObject(new WebSocket(varg0));
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__widl_f_new_WebSocket = __widl_f_new_WebSocket;

function __widl_f_send_with_str_WebSocket(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {
        getObject(arg0).send(varg1);
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__widl_f_send_with_str_WebSocket = __widl_f_send_with_str_WebSocket;

function __widl_f_set_onopen_WebSocket(arg0, arg1) {
    getObject(arg0).onopen = getObject(arg1);
}

__exports.__widl_f_set_onopen_WebSocket = __widl_f_set_onopen_WebSocket;

function __widl_f_set_onmessage_WebSocket(arg0, arg1) {
    getObject(arg0).onmessage = getObject(arg1);
}

__exports.__widl_f_set_onmessage_WebSocket = __widl_f_set_onmessage_WebSocket;

function __widl_instanceof_Window(idx) { return getObject(idx) instanceof Window ? 1 : 0; }

__exports.__widl_instanceof_Window = __widl_instanceof_Window;

function __widl_f_request_animation_frame_Window(arg0, arg1, exnptr) {
    try {
        return getObject(arg0).requestAnimationFrame(getObject(arg1));
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__widl_f_request_animation_frame_Window = __widl_f_request_animation_frame_Window;

function __widl_f_document_Window(arg0) {

    const val = getObject(arg0).document;
    return isLikeNone(val) ? 0 : addHeapObject(val);

}

__exports.__widl_f_document_Window = __widl_f_document_Window;

function __widl_f_location_Window(arg0) {
    return addHeapObject(getObject(arg0).location);
}

__exports.__widl_f_location_Window = __widl_f_location_Window;

function __widl_f_session_storage_Window(arg0, exnptr) {
    try {

        const val = getObject(arg0).sessionStorage;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__widl_f_session_storage_Window = __widl_f_session_storage_Window;

function __widl_f_log_1_(arg0) {
    console.log(getObject(arg0));
}

__exports.__widl_f_log_1_ = __widl_f_log_1_;

function __wbg_eval_85995b3327031df6(arg0, arg1, exnptr) {
    let varg0 = getStringFromWasm(arg0, arg1);
    try {
        return addHeapObject(eval(varg0));
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__wbg_eval_85995b3327031df6 = __wbg_eval_85995b3327031df6;

function __wbg_newnoargs_9fab447a311888a5(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}

__exports.__wbg_newnoargs_9fab447a311888a5 = __wbg_newnoargs_9fab447a311888a5;

function __wbg_call_001e26aeb2fdef67(arg0, arg1, exnptr) {
    try {
        return addHeapObject(getObject(arg0).call(getObject(arg1)));
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__wbg_call_001e26aeb2fdef67 = __wbg_call_001e26aeb2fdef67;

function __wbg_call_32cfc8705e333e03(arg0, arg1, arg2, exnptr) {
    try {
        return addHeapObject(getObject(arg0).call(getObject(arg1), getObject(arg2)));
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__wbg_call_32cfc8705e333e03 = __wbg_call_32cfc8705e333e03;

function __wbg_new_b2ae0eb8a50f5a8d(arg0, arg1) {
    let cbarg0 = function(arg0, arg1) {
        let a = this.a;
        this.a = 0;
        try {
            return this.f(a, this.b, addHeapObject(arg0), addHeapObject(arg1));

        } finally {
            this.a = a;

        }

    };
    cbarg0.f = wasm.__wbg_function_table.get(205);
    cbarg0.a = arg0;
    cbarg0.b = arg1;
    try {
        return addHeapObject(new Promise(cbarg0.bind(cbarg0)));
    } finally {
        cbarg0.a = cbarg0.b = 0;

    }
}

__exports.__wbg_new_b2ae0eb8a50f5a8d = __wbg_new_b2ae0eb8a50f5a8d;

function __wbg_resolve_13a0331c403143fa(arg0) {
    return addHeapObject(Promise.resolve(getObject(arg0)));
}

__exports.__wbg_resolve_13a0331c403143fa = __wbg_resolve_13a0331c403143fa;

function __wbg_then_19e0dd10f4df0a30(arg0, arg1) {
    return addHeapObject(getObject(arg0).then(getObject(arg1)));
}

__exports.__wbg_then_19e0dd10f4df0a30 = __wbg_then_19e0dd10f4df0a30;

function __wbg_then_b324e05c8e37044e(arg0, arg1, arg2) {
    return addHeapObject(getObject(arg0).then(getObject(arg1), getObject(arg2)));
}

__exports.__wbg_then_b324e05c8e37044e = __wbg_then_b324e05c8e37044e;

function __wbg_get_243d694f7ef879f0(arg0, arg1, exnptr) {
    try {
        return addHeapObject(Reflect.get(getObject(arg0), getObject(arg1)));
    } catch (e) {
        handleError(exnptr, e);
    }
}

__exports.__wbg_get_243d694f7ef879f0 = __wbg_get_243d694f7ef879f0;

function __wbg_error_4bb6c2a97407129a(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);

    varg0 = varg0.slice();
    wasm.__wbindgen_free(arg0, arg1 * 1);

    console.error(varg0);
}

__exports.__wbg_error_4bb6c2a97407129a = __wbg_error_4bb6c2a97407129a;

function __wbg_new_59cb74e423758ede() {
    return addHeapObject(new Error());
}

__exports.__wbg_new_59cb74e423758ede = __wbg_new_59cb74e423758ede;

function __wbg_stack_558ba5917b466edd(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).stack);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

__exports.__wbg_stack_558ba5917b466edd = __wbg_stack_558ba5917b466edd;

function __wbindgen_string_new(p, l) { return addHeapObject(getStringFromWasm(p, l)); }

__exports.__wbindgen_string_new = __wbindgen_string_new;

function __wbindgen_is_undefined(i) { return getObject(i) === undefined ? 1 : 0; }

__exports.__wbindgen_is_undefined = __wbindgen_is_undefined;

function __wbindgen_string_get(i, len_ptr) {
    let obj = getObject(i);
    if (typeof(obj) !== 'string') return 0;
    const ptr = passStringToWasm(obj);
    getUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;
    return ptr;
}

__exports.__wbindgen_string_get = __wbindgen_string_get;

function __wbindgen_debug_string(i, len_ptr) {
    const debug_str =
    val => {
        // primitive types
        const type = typeof val;
        if (type == 'number' || type == 'boolean' || val == null) {
            return  `${val}`;
        }
        if (type == 'string') {
            return `"${val}"`;
        }
        if (type == 'symbol') {
            const description = val.description;
            if (description == null) {
                return 'Symbol';
            } else {
                return `Symbol(${description})`;
            }
        }
        if (type == 'function') {
            const name = val.name;
            if (typeof name == 'string' && name.length > 0) {
                return `Function(${name})`;
            } else {
                return 'Function';
            }
        }
        // objects
        if (Array.isArray(val)) {
            const length = val.length;
            let debug = '[';
            if (length > 0) {
                debug += debug_str(val[0]);
            }
            for(let i = 1; i < length; i++) {
                debug += ', ' + debug_str(val[i]);
            }
            debug += ']';
            return debug;
        }
        // Test for built-in
        const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
        let className;
        if (builtInMatches.length > 1) {
            className = builtInMatches[1];
        } else {
            // Failed to match the standard '[object ClassName]'
            return toString.call(val);
        }
        if (className == 'Object') {
            // we're a user defined class or Object
            // JSON.stringify avoids problems with cycles, and is generally much
            // easier than looping through ownProperties of `val`.
            try {
                return 'Object(' + JSON.stringify(val) + ')';
            } catch (_) {
                return 'Object';
            }
        }
        // errors
        if (val instanceof Error) {
        return `${val.name}: ${val.message}
        ${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
;
const toString = Object.prototype.toString;
const val = getObject(i);
const debug = debug_str(val);
const ptr = passStringToWasm(debug);
getUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;
return ptr;
}

__exports.__wbindgen_debug_string = __wbindgen_debug_string;

function __wbindgen_cb_drop(i) {
    const obj = takeObject(i).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return 1;
    }
    return 0;
}

__exports.__wbindgen_cb_drop = __wbindgen_cb_drop;

const __wbindgen_cb_forget = dropObject;

__exports.__wbindgen_cb_forget = __wbindgen_cb_forget;

function __wbindgen_jsval_eq(a, b) { return getObject(a) === getObject(b) ? 1 : 0; }

__exports.__wbindgen_jsval_eq = __wbindgen_jsval_eq;

function __wbindgen_memory() { return addHeapObject(wasm.memory); }

__exports.__wbindgen_memory = __wbindgen_memory;

function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

__exports.__wbindgen_throw = __wbindgen_throw;

function __wbindgen_closure_wrapper171(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(45);
    const d = wasm.__wbg_function_table.get(46);
    const cb = function() {
        this.cnt++;
        try {
            return f(this.a, b);

        } finally {
        if (--this.cnt === 0) { d(this.a, b); this.a = 0; }

    }

};
cb.a = a;
cb.cnt = 1;
let real = cb.bind(cb);
real.original = cb;
return addHeapObject(real);
}

__exports.__wbindgen_closure_wrapper171 = __wbindgen_closure_wrapper171;

function __wbindgen_closure_wrapper173(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(49);
    const d = wasm.__wbg_function_table.get(46);
    const cb = function(arg0) {
        this.cnt++;
        try {
            return f(this.a, b, addHeapObject(arg0));

        } finally {
        if (--this.cnt === 0) { d(this.a, b); this.a = 0; }

    }

};
cb.a = a;
cb.cnt = 1;
let real = cb.bind(cb);
real.original = cb;
return addHeapObject(real);
}

__exports.__wbindgen_closure_wrapper173 = __wbindgen_closure_wrapper173;

function __wbindgen_closure_wrapper379(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(146);
    const d = wasm.__wbg_function_table.get(147);
    const cb = function() {
        this.cnt++;
        let a = this.a;
        this.a = 0;
        try {
            return f(a, b);

        } finally {
            if (--this.cnt === 0) d(a, b);
            else this.a = a;

        }

    };
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

__exports.__wbindgen_closure_wrapper379 = __wbindgen_closure_wrapper379;

function __wbindgen_closure_wrapper381(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(150);
    const d = wasm.__wbg_function_table.get(147);
    const cb = function(arg0, arg1, arg2) {
        this.cnt++;
        try {
            return f(this.a, b, addHeapObject(arg0), arg1, arg2);

        } finally {
        if (--this.cnt === 0) { d(this.a, b); this.a = 0; }

    }

};
cb.a = a;
cb.cnt = 1;
let real = cb.bind(cb);
real.original = cb;
return addHeapObject(real);
}

__exports.__wbindgen_closure_wrapper381 = __wbindgen_closure_wrapper381;

function __wbindgen_closure_wrapper413(a, b, _ignored) {
    const f = wasm.__wbg_function_table.get(166);
    const d = wasm.__wbg_function_table.get(167);
    const cb = function(arg0) {
        this.cnt++;
        let a = this.a;
        this.a = 0;
        try {
            return f(a, b, addHeapObject(arg0));

        } finally {
            if (--this.cnt === 0) d(a, b);
            else this.a = a;

        }

    };
    cb.a = a;
    cb.cnt = 1;
    let real = cb.bind(cb);
    real.original = cb;
    return addHeapObject(real);
}

__exports.__wbindgen_closure_wrapper413 = __wbindgen_closure_wrapper413;

function __wbindgen_object_clone_ref(idx) {
    return addHeapObject(getObject(idx));
}

__exports.__wbindgen_object_clone_ref = __wbindgen_object_clone_ref;

function __wbindgen_object_drop_ref(i) { dropObject(i); }

__exports.__wbindgen_object_drop_ref = __wbindgen_object_drop_ref;

function init(module) {
    let result;
    const imports = { './mem2': __exports };
    if (module instanceof URL || typeof module === 'string' || module instanceof Request) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                console.warn("`WebAssembly.instantiateStreaming` failed. Assuming this is because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                return response
                .then(r => r.arrayBuffer())
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;
        wasm.__wbindgen_start();
        return wasm;
    });
}

export default init;

