import { computed, defineComponent, openBlock, createBlock, resolveDynamicComponent, normalizeStyle, withCtx, createTextVNode, toDisplayString } from 'vue';
import { pick, without, mapValues } from 'lodash-es';

const useComponentCommon = (props, picks) => {
    const styleProps = computed(() => pick(props, picks));
    const handleClick = () => {
        if (props.actionType === 'url' && props.url && props.isEditing) {
            window.location.href = props.url;
        }
    };
    return {
        styleProps,
        handleClick
    };
};

const commonDefaultProps = {
    // actions
    actionType: '',
    url: '',
    // size
    height: '',
    width: '318px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    // border type
    borderStyle: 'none',
    borderColor: '#000',
    borderWidth: '0',
    borderRadius: '0',
    // shadow and opacity
    boxShadow: '0 0 0 #000000',
    opacity: '1',
    // position and x,y
    position: 'absolute',
    left: '0',
    top: '0',
    right: '0'
};
const imageDefaultProps = {
    src: 'test.url',
    ...commonDefaultProps
};
const isEditingProp = {
    isEditing: {
        type: Boolean,
        default: false
    }
};
const textDefaultProps = {
    // basic props - font styles
    text: '正文内容',
    fontSize: '14px',
    fontFamily: '',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    lineHeight: '1',
    textAlign: 'left',
    color: '#000000',
    backgroundColor: '',
    ...commonDefaultProps
};
const textStylePropNames = without(Object.keys(textDefaultProps), 'actionType', 'url', 'text');
without(Object.keys(imageDefaultProps), 'src');
const transformToComponentProps = (props) => {
    const mapProps = mapValues(props, (item) => {
        return {
            type: item.constructor,
            default: item
        };
    });
    return { ...mapProps, ...isEditingProp };
};

const defaultProps = transformToComponentProps(textDefaultProps);
var script = defineComponent({
    name: 'l-text',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        ...defaultProps
    },
    setup(props) {
        const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames);
        return {
            styleProps,
            handleClick
        };
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
    style: normalizeStyle(_ctx.styleProps),
    class: "l-text-component",
    onClick: _ctx.handleClick
  }, {
    default: withCtx(() => [
      createTextVNode(toDisplayString(_ctx.text), 1 /* TEXT */)
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["style", "onClick"]))
}

script.render = render;
script.__scopeId = "data-v-05bc8623";
script.__file = "src/components/Ltext/LText.vue";

script.install = (app) => {
    app.component(script.name, script);
};

const components = [
    script
];
const install = (app) => {
    components.forEach(component => {
        app.component(component.name, component);
    });
};
var index = {
    install
};

export { script as LText, index as default, install };
