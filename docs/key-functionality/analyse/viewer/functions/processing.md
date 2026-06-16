# Processors

Processors are compiled pre-defined routines.

They provide functionality that would be hard or slow to implement in FDL.

## Trigonometric

Calculated in _radians_:

* `acos(x)`
* `asin(x)`
* `atan(x)`
* `atan2(x,y)` _(arc tan of `y/x`)_
* `cos(x)`
* `cosh(x)`
* `sin(x)`
* `sinh(x)`
* `tan(x)`
* `tanh(x)`

## Mathematical

Simple scalar calculations:

* `abs(x)`
* `ceil(x)`
* `exp(x)`
* `floor(x)`
* `ln(x)` _(natural logarithm)_
* `log(x)` _(base 10 logarithm)_
* `sqrt(x)`

Calulated against parameters with respect to time (even in distance-mode):

* `derivative(param)`
* `integral(param)`

## Logical

`not(x)` _or_ `!x`
:   Returns `TRUE` if `x` is 0, otherwise `FALSE`.

`IsInRange(a, b, epsilon)`
:   Returns `1` if `a` is in range of `b`.
 
`IsGT(a, b)`
:   Returns `1` if `a` is greater than `b`, otherwise returns `0`.
 
`IsGE(a, b)`
:   Returns `1` if `a` is greater than or equal to `b`, otherwise returns `0`.
 
`IsLT(a, b)`
:   Returns `1` if `a` if less than `b`, otherwise returns `0`.
 
`IsLE(a, b)`
:   Returns `1` is `a` is less than or equal to `b`, otherwise returns `0`.

## Interpolation

`BiLinearInterpolate(file, x, y)`
:   Returns a bi-linearly interpolated result corresponding to `x`, `y` from `file`.

    * `x` and `y` are parameter names (e.g. `$vCar`) or expressions
    * `file` is the path to a `.3d` file in the format specified below.  

    ??? "Data file format"

        The filename must have the extension `.3d`

        The content is ASCII text, representing the values of data points in a grid.
        Comment lines are prefixed with `#`.

        Grid rules:

        * The grid must be fully populated and rectilinear but need not be regular  
        i.e. there may be irregular intervals between ordinates but each intersection of an ordinate must have a data value;
        * There must be at least 4 data points in the grid;
        * Entries must be ordered within a row such that column range values increase to the right   
        and within a column such that row range values increase to the bottom;
        * Entries on the same line must be separated with tabs or commas;
        * Both input values must lie within the grid.

        If any of these rules are broken, `BiLinearInterpolate(...)` returns a result of `0` and a warning is displayed when ATLAS first attempts to use the processor.

        | Line    | Entry                              | Description                                                            |
        | ------- | ---------------------------------- | -----------------------------------------------------------------------|
        | 1       | _blank , X1, X2, &#8230;, Xi_      | _Xi_ = value of column _i_ ordinate                                    |
        | 2       | _Y1, Z1,1, Z2,1, &#8230; , Zi,1_   | 1st row of table (_i_ columns × _j_ rows),<br>_Yi_ = value of row _j_ ordinate<br>_Zi,j_ = data value at intersection of column _i_ and row _j_ |
        | 3       | _Y2, Z1,2, Z2,2, &#8230; , Zi,2_   | 2nd row of table                                                       |
        | &#8230; | &#8230;                            | 3rd and successive rows of table                                       |                            
        | _n_     | _Yj, Z1,j, Z2,j,... , Zi,j_        | last row of table                                                      |

        ???+ example

            This file&#8230;

            ```
            # Example 3d grid
            ,5,7.5,10
            0,1,2,3
            10,4,5,6
            25,7,8,9
            30,10,11,12
            ```

            &#8230; creates this table:

            <table>
                <col>
                <col>
                <col>
                <col>
                <col>
                <thead>
                    <tr>
                        <th />
                        <th colspan="4" style="text-align: center">Input X Range</td>
                    </tr>
                    <tr>
                        <th />
                        <th />
                        <th>5</td>
                        <th>7.5</td>
                        <th>10</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th rowspan="4" style="writing-mode: sideways-lr; vertical-align: middle">Input Y Range</th>
                        <th>0</th>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <th>10</th>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <th>25</th>
                        <td>7</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <th>30</th>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                    </tr>
                </tbody>
            </table>

        ???+ info "Formulae"

            If _Xi &lt;= `x` &lt;= Xi+1_ and _Yj &lt;= `y` &lt;= Yj+1_ then

            _Za = Zi,j + ( (`x` - Xj) * (Zi+1,j - Zi,j) / (Xi+1 - Xi) )_  
            _Zb = Zi,j+1 + ( (`x` - Xj) * (Zi+1,j+1 - Zi,j+1) / (Xi+1 - Xi) )_  
            _result = Za + ( (`y` - Yj) * (Zb - Za) / (Yj+1 - Yj) )_ 
 

`LinearInterpolate(file, x)`
:   Returns a linearly-interpolated result corresponding to `x` from `file`.

    * `x` is a parameter name (e.g. `$vCar`) or expression
    * `file` is the path to a `.3d` file in the format specified below.  

    If `x` under or over the limits of the data set then a result extrapolated from the lowest or highest two data points is returned.

    ??? "Data file format"

        The filename must have the extension `.2d`

        The content is ASCII text, representing the values of data points in a grid.
        Comment lines are prefixed with `#`.

        Grid rules:

        * There must be at least two pairs of data but there can be as many as required;
        * Entries must be ordered with lowest input, first;
        * Entries on the same line must be separated with tabs or commas;
        * No consecutive pair of inputs may be the same (to prevent divide by zero errors when calculating _m_).

        If any of these rules are broken, `LinearInterpolate(...)` returns a result of `0` and a warning is displayed when ATLAS first attempts to use the processor.

        | Line    | Entry     | Description                                                            |
        | ------- | --------- | -----------------------------------------------------------------------|
        | 1       | _Y1, Z1_  | 1st pair (_Y_ = input value, _Z_ = resulting data value); required     |
        | 2       | _Y2, Z2_  | 2nd pair; required                                                     |
        | &#8230; | &#8230;   | 3rd and successive pairs; optional                                     |                            
        | _n_     | _Yn, Zn_  | last pair                                                              |

        ???+ example

            This file&#8230;

            ```
            # Example 2d grid
            0,1
            10,4
            25,7
            30,10
            ```

            &#8230; creates this table:

            | Input range   | Data values   |
            | ------------- | --------------|
            | **0**         | 1             |
            | **10**        | 4             |
            | **25**        | 7             |
            | **30**        | 10            |

        ???+ info "Formulae"

            * If `x` is between Yi and Yi+1 then   _result = mi*(`x` – Yi) + Zi_
            * If `x` is below Y1 then _result = m1*(`x` - Yi) + Z1_
            * If `x` is above Yn then _result = mn-1*(`x` - Yn) + Zn_

            Where mi = (Zi+1 - Zi)/(Yi+1 - Yi)

## Filtering

!!! note

    `param` must be a parameter from a data channel or another function, not the result of a calculation:

`Filter(param,freq)`
:   Calculates the smoothed value of the parameter.  
    This is a low-pass filter with a cut-off frequency of `freq`.

`HighPassFilter(param,freq)`
:   Calculates the smoothed value of the parameter.  
    This is a high-pass Filter with a cut-off frequency of `freq`.

`DigitalFilter1(param, B1, B2, A1, A2)`
:   Implements a 1st order digital filter using the difference equation  
    _`A1`*y(n) = `B1`*x(n) + `B2`*x(n-1) - `A2`*y(n-1)_

`DigitalFilter2(param, B1, B2, B3, A1, A2, A3)`
:   Implements a 2nd order digital filter using the difference equation  
    _`A1`*y(n) = `B1`*x(n) + `B2`*x(n-1) + `B3`*x(n-2) – `A2`*y(n-1) - `A3`*y(n-2)_

`DigitalFilter3(param, B1, B2, B3, B4, A1, A2, A3, A4)`
:   Implements a 3rd order digital filter using the difference equation  
    _`A1`*y(n) = `B1`*x(n) + `B2`*x(n-1) + `B3`*x(n-2) + `B4`*x(n-3) - `A2`*y(n-1) - `A3`*y(n-2) - `A4`*y(n-3)_

!!! caution

    For all 3 types of digital filter, it is your responsibility to ensure the function is evaluated at the appropriate frequency for the filter coefficients.
    
    The _Fixed Frequency_ calculation mode is recommended to ensure that changes to the parameters sampling rates do not affect filter results.

`MedianFilter(param,n)`
:   Calculates the median filter value in a data window of _n/2_ samples either side of the current data point.

`MedianFilter9(param)`
:   Calculates the median filter value of a data window 4 points either side of the current data point.  
    The effect is to remove spikes from the data, where their width is less than 4 data-points.

`MedianFilter17(param)`
:   As above, but the data window is 17 points wide, enabling spikes to be filtered out up to 8 data-points wide.

`MedianFilter25(param)`
:   As above, but the data window is 25 points wide, enabling spikes to be filtered out up to 12 data-points wide.

`PhaseCompFilter(param, freq)`
:   Calculates a phase-compensated filter which does not lag behind its input parameter.  
    The filter has a cut-off frequency of `freq`.
    
    The phase-compensated filter does not respond well at very low cut-off frequencies, especially for pre-calculated functions.  
    In this case, the data is filtered at a higher cut-off frequency.

## Special

These perform special operations on data &mdash; such as returning information about a recorded parameter &mdash; or special actions &mdash; such as writing log output.

!!! note

    `param` must be a parameter from a data channel (i.e. not the result of a calculation).

`BitOfWord(param, bit)`
:   Returns `1` if bit number bit in the parameter `param` is `1`, otherwise returns `0`.  
    Bits count from `0` and from least significant to most significant.
 
`ClearLog(logname)`
:   Clears the contents of the file path `logname`.

`CurrentLapNumber()`
:   Returns the current Lap number.
 
`IsFirstPass()`
:   Returns `TRUE` the first time that the function is used to evaluate a term and returns `FALSE` for successive passes.  
    Reset when the function is completed.
 
`IsInError(param)`
:   Returns `TRUE` if the parameter value is in error for that parameter (iIndicates that the sensor may be out of range).
 
`IndexBySample(param, n)`
:   Returns the value of parameter `param`, `n` samples forward or backward (`n` –ve).
 
`IndexByTime(param, t)`
:   Returns the value of parameter `param`, `t` seconds forward or backward (`t` –ve).

`LapBestFit(x, y, Or, Os)`
:   Returns the best fit line of parameters `x` and `y` with nth order of `Or` and coefficient index of `Os` (i.e. `0` = offset, `1` = slope etc.)  
    Returns coefficients during current lap.
 
`LapMax(param)`
:   Returns the maximum value of parameter `param` during the current lap.
 
`LapMean(param)`
:   Returns the mean value of parameter `param` during the current lap.
 
`LapMin(param)`
:   Returns the minimum value of parameter `param` during the current lap.
 
`LapStdDev(param)`
:   Returns the standard deviation of parameter `param` during the current lap.
 
`LapTime(lap)`
:   Returns the lap time in seconds of the given lap `lap`.
 
`LinearRegressionOffset(x, y)`
:   Returns Linear Regression Offset for parameters `x` and `y` during current lap.
 
`LinearRegressionR2(x, y)`
:   Returns Linear Regression R2 for parameters `x` and `y` during current lap.
 
`LinearRegressionSlope(x, y)`
:   Returns Linear Regression Slope for parameters `x` and `y` during current lap.
 
`SamplesMax(param, n)`
:   Returns the rolling maximum value of parameter `param` over the previous n samples.
 
`SamplesMin(param, n)`
:   Returns the rolling minimum value of parameter `param` over the previous n samples.
 
`SessionMax(param)`
:   Returns the maximum value of parameter `param` during the whole session.
 
`SessionMean(param)`
:   Returns the mean value of parameter `param` during the whole session.
 
`SessionMin(param)`
:   Returns the minimum value of parameter `param` during the whole session.
 
`SessionStdDev(param)`
:   Returns the standard deviation of parameter `param` during the whole session.
 
`SetEvent(n, d, g, p, v)`
:   Sets an Event at a given time.

    * `n` &mdash; Name
    * `d` &mdash; Description
    * `g` &mdash; Group
    * `p` &mdash; Priority (0 -2)
    * `v` &mdash; Volatility (0,1)
 
`SamplesPerSec(param)`
:   Returns the sample rate in Hz being used to sample the parameter.
 
`TimeIntoLap()`
:   Returns the time in seconds from the start of the current lap in the Active Layer.
 
`TimeIntoSession()`
:   Returns the time in seconds from the start of the current session in the Active Layer.
 
`TimeOfDay()`
:   Returns the time in seconds from midnight for the Active Layer Time Position.
 
`UwLapMean(param)`
:   Returns the unweighted Mean value of parameter `param` during the current Lap.
 
`UwLapStdDev(param)`
:   Returns the unweighted Standard Deviation value of parameter `param` during the current Lap.
 
`UwSessionMean(param)`
:   Returns the unweighted Mean value of parameter `param` during the Session.
 
`UwSessionStdDev(param)`
:   Returns the unweighted Standard Deviation value of parameter `param` during the Session.
 
`WriteToLog (‘logname’, entry)`
:   Appends a line to the file `logname` with the text: `FunctionName` &amp; ++tab++ &amp; `entry`

    * `FunctionName` = the name of the function in which the processor was executed.
    * `entry` = a string enclosed in quotes or an expression which can be evaluated to a numeric value which is converted to a string representing the value to 8 or more digits.

## Operator Order of Precedence

* `||` boolean operator _(left associative)_ 
* `&&` boolean operator _(left associative)_
* `!` boolean operator _(non-associative)_
* `<`, `<=`, `>`, `>=`, `==`, `!=` relational operators _(left associative)_
* `=` assignment operator _(right associative)_
* `+` and `-` operators _(left associative)_
* `*`, `/` and `%` operators _(left associative)_ 
* `^` operator _(right associative)_ 
* unary `-` operator _(non-associative)_
* `++` and `--` operators _(non-associative)_

## Mathematical Operators

`-` _expr_
:   The result is the negation of the expression.
 
_expr_ `+` _expr_
:   The result of the expression is the sum of the two expressions.
 
_expr_ `–` _expr_
:   The result of the expression is the difference between the two expressions.
 
_expr_ `*` _expr_
:   The result of the expression is the product of the two expressions.
 
_expr_ `/` _expr_
:   The result of the expression is the quotient of the two expressions.
 
_expr_ `%` _expr_
:   The result of the expression is the remainder of the division.
 
`^` _expr_
:   The result of the expression is the value of the first expression raised to the second expression.  
    The second expression must be an integer.
 
`(` _expr_ `)`
:   Alters the standard precedence to force the evaluation of the expression, e.g. a + b / c is not the same as (a + b) / c.
 
## Variable Operators

`var` refers to either a simple or an array variable.  
A simple variable is just a name; an array variable is specified as `name[expr]` (array subscript may be an expression).

`++`_var_
:   The variable is incremented by one and the new value is the result of the expression.
 
`--`_var_
:   The variable is decremented by one and the new value is the result of the expression.
 
_var_`++`
:   The result of the expression is the value of the variable and the variable is then incremented by one.
 
_var_`--`
:   The result of the expression is the value of the variable and the variable is then decremented by one.
 
_var_ `=` _expr_
:   The variable is assigned the value of the expression.
 
_var_ **_op_**`=` _expr_
:   This is equivalent to _var_ `=` _var_ **_op_** _expr_ with the exception that the _var_ part is evaluated only once.  
    This can make a difference if var is an array.  
    **_op_** is one of the mathematical operators `+`, `-`, `*`, `/`, `%` or `^`.

## Relational Operators

Relational expressions evaluate to either `0` (if the relation is false) or `1` (if the relation is true).  
These may appear in any legal expression.

_expr1_ `<` _expr2_
:   The result is `1` if _expr1_ is strictly less than _expr2_.
 
_expr1_ `<=` _expr2_
:   The result is `1` if _expr1_ is less than or equal to _expr2_.
 
_expr1_ `>` _expr2_
:   The result is `1` if _expr1_ is strictly greater than _expr2_.
 
_expr1_ `>=` _expr2_
:   The result is `1` if _expr1_ is greater than or equal to _expr2_.
 
_expr1_ `==` _expr2_
:   The result is `1` if _expr1_ is equal to _expr2_.
 
_expr1_ `!=` _expr2_
:   The result is `1` if _expr1_ is not equal to _expr2_.
 
## Boolean Operators

The result of all boolean operators is either `0` or `1` (for `false` and `true`), as in Relational expressions.

Any non-zero value is treated as `1`.

`!` _expr_
:   The result is `1` if _expr_ is `0`, otherwise `0`. (`NOT`)
 
_expr_ `&&` _expr_
:   The result is `1` if both expressions are non⌀zero, otherwise `0`. (`AND`)
 
_expr_ `||` _expr_
:   The result is `1` if either expression is non⌀zero otherwise `0`. (`OR`)
 
## Bitwise Operators

`~`_expr_
:   Bitwise `NOT`
 
_expr_ `&` _expr_
:   Bitwise `AND`
 
_expr_ `|` _expr_
:   Bitwise `OR`
 
_expr_ `>>` _expr_
:   Shift right
 
_expr_ `<<` _expr_
:   Shift left
