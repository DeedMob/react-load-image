/// <reference types="react" />

export = ImageLoader;

interface ImageLoaderProps {
  /**
   * The URL of the image to be loaded, will be passed as the src prop to your
   * first child provided. If you want to use it as a background image, make
   * your first child a react component like
   * `(props) => <div style={{backgroundImage: props.src}}/>`
   */
  src: string;
  /**
   * The first child of `ImageLoader` will be rendered when the image is successfully loaded. The `src` prop will be passed to it.
   * The second child of `ImageLoader` will be rendered when the image load fails.
   * The third child of `ImageLoader` will be rendered when the image is in the process of loading
   */
  children: React.ReactNode;
  /** An optional value for the srcset attribute of the img */
  srcSet?: string;
  /** An optional handler for the [load] event. */
  onLoad?: (this: GlobalEventHandlers, ev: Event) => any;
  /** An optional handler for the [error] event. */
  onError?: OnErrorEventHandler;
  /** Wrapper container class name */
  className?: string;
  /** Optional attributes of wrapper container */
  wrapperProps?: Record<string, any>;
}

declare var ImageLoader: React.ComponentType<ImageLoaderProps>;
