import type { Component } from 'solid-js';
import { createEffect, createSignal, For, Show } from 'solid-js';

import styles from './App.module.css';
import InfList from './InfList';
import { units } from './data';


const App: Component = () => {


    let inputEl;

    const current = createSignal(0);
    const [curr, setCurr] = current;

    const currentPhysicalQuantity = createSignal(0);
    const [currPQ, setCurrPQ] = currentPhysicalQuantity;


    let currUnits = () => {
        // console.log('hi');

        return units[Object.keys(units)[currPQ()]]
    };
    // createEffect(() => {
    //     console.log("The count is now", physicalQuantity());
    // });


    const [value, setValue] = createSignal(1)

    function handleValueChange(e: { target: { value: any; }; }) {
        setValue(e.target.value);
    }

    function handleClick() {
        inputEl.focus()
    }

    return (
        <div class={styles.App}>
            <div class={styles.row}>
                <InfList current={currentPhysicalQuantity} dir='horizontal'>
                    <For each={Object.keys(units)}>{(pq, i) =>
                        <span classList={{ [styles.card]: true, [styles.activePhysicalCard]: currPQ() == i() }}
                            style={{ 'width': '130px', 'text-align': 'center'}}>
                            {pq}
                        </span>
                    }</For>
                </InfList>
            </div>
            <div class={styles.row}>
                <div class={styles.col} >
                    <div class={styles.row} style={{ 'height': '100%', "position": 'relative' }} onClick={handleClick}>
                        <div class={styles.overlayItem} style={{
                            'display': 'flex',
                            'justify-content': 'center',
                            'flex-direction': 'column',
                            'align-items': 'flex-end'
                        }}>
                            <input onInput={handleValueChange} ref={inputEl} type='number' value={value()}></input>
                        </div>
                        <div class={styles.overlayItem} style={{
                            'display': 'flex',
                            'justify-content': 'end'
                        }}>
                            {/* <div class={styles.col} > */}
                            <InfList current={current}>
                                <For each={currUnits()}>{(unit, i) =>
                                    <span classList={{ [styles.card]: !0, [styles.activeCard]: curr() == i() }}>
                                        {unit.shorthand}
                                    </span>
                                }</For>
                            </InfList>
                        </div>
                    </div>
                </div>

                <div class={styles.col}>
                    <InfList>
                        <For each={currUnits()}>{(unit, _) =>
                            <span class={styles.card}>
                                {unit.fromBase(currUnits()[curr()].toBase(value())).toPrecision(4)} {unit.name} ({unit.shorthand})
                            </span>
                        }</For>

                    </InfList>
                </div>

            </div>
        </div>
    );
};

export default App;
