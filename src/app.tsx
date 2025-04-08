import classNames from 'classnames';
import { FC, useState } from 'react';
import styles from './app.module.css';
import reactLogo from './assets/react.svg';
import { Button } from './components/button.tsx';
import viteLogo from '/vite.svg';

export const App: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-row">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className={classNames(styles.logo, styles.vue)} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className={classNames(styles.logo, styles.react)} alt="React logo" />
        </a>
      </div>
      <h1 className="my-[0.5em] text-[3.2em] leading-[1.1] font-bold">Vite + React</h1>
      <div className="py-[2em] text-center">
        <Button
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </Button>
        <p className="my-[1em]">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-[#888]">Click on the Vite and React logos to learn more</p>
    </div>
  );
};
