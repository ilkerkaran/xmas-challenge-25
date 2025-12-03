from readInput import read_input
lines = read_input('day-1-ex.txt')
cur = 50
zeroOcc = 0


def move(c, steps):
    original_c = c
    print(f"Moving from {c} by {steps}")
    zeroPass = abs(steps) // 100
    print(f"Zero Passes: {zeroPass}")
    modded_steps = steps % 100
    print(f"Modded Steps: {modded_steps}")
    c += modded_steps
    if c > 100 | c < 0:
        zeroPass += 1
    c = c % 100

    if steps < 0 & original_c < c:
        zeroPass += 1
        print(f"New position: {c}, pass: {zeroPass}")
    print(f"from: {original_c}, to: {c}, Steps: {steps}, ZeroPass: {zeroPass}")
    return c, zeroPass


for line in lines:
    dir = line[0]
    steps = int(line[1:])
    if (dir == 'L'):
        steps = -1 * steps
    [cur, zeroPass] = move(cur, steps)
    zeroOcc += zeroPass

    print("-----")
print(f"Final Position: {cur}, Zero Occurrences: {zeroOcc}")
