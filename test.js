// Simple tests
function add(a, b) {
    return a + b;
}

function testAdd() {
    if (add(2, 3) === 5) {
        console.log("✅ Test 1 passed: add(2,3) = 5");
    } else {
        console.log("❌ Test 1 failed!");
        process.exit(1);  // test fail అయితే stop అవుతుంది
    }
}

function testAppRunning() {
    if (typeof add === 'function') {
        console.log("✅ Test 2 passed: functions exist");
    } else {
        console.log("❌ Test 2 failed!");
        process.exit(1);
    }
}

testAdd();
testAppRunning();
console.log("✅ All tests passed!");
